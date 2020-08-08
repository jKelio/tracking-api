import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from 'src/app/common/security/services/auth.service';

import { LoginResourceMapper } from '../mappers/login-resource.mapper';

@Controller('login')
export class LoginController {
  constructor(
    private authService: AuthService,
    private mapper: LoginResourceMapper,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  public async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    const loginResource = this.mapper.toResource(
      await this.authService.login(req.user),
    );
    res
      .status(HttpStatus.OK.valueOf())
      .set('Authorization', `Bearer ${loginResource.getAccessToken()}`)
      .send(loginResource);
  }
}
