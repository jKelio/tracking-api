import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/app/common/security/guards/jwt-auth.guard';
import { UserAccountService } from 'src/app/common/user-accounts/services/user-account/user-account.service';

import { ChangePasswordDto } from '../dtos/change-password.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserAccountsResourceMapper } from '../mappers/user-accounts-resource.mapper';
import { UserAccountResource } from '../resources/user-accounts.resource';

@Controller('user-accounts')
export class UserAccountsController {
  constructor(
    private usersService: UserAccountService,
    private mapper: UserAccountsResourceMapper,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED.valueOf())
  public async createUser(@Body() dto: CreateUserDto): Promise<void> {
    await this.usersService.create(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getUsers(): Promise<UserAccountResource[]> {
    return this.usersService
      .getUsers()
      .then(users => this.mapper.toResources(users));
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  public getCurrentUser(@Req() req: Request): Promise<UserAccountResource> {
    (req.user as any).userId;
    return this.usersService
      .findById((req.user as any).userId)
      .then(user => this.mapper.toResource(user));
  }

  @UseGuards(JwtAuthGuard)
  @Put('me/password')
  @HttpCode(HttpStatus.OK.valueOf())
  public async changePassword(
    @Req() req: Request,
    @Body() dto: ChangePasswordDto,
  ): Promise<void> {
    await this.usersService.changePassword(
      (req.user as any).userId,
      dto.currentPassword,
      dto.newPassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  @HttpCode(HttpStatus.OK.valueOf())
  public async deleteCurrentUser(@Req() req: Request): Promise<void> {
    await this.usersService.deleteUser((req.user as any).userId);
  }
}
