import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/app/common/security/guards/jwt-auth.guard';

import { CreatedFriendDto } from '../../dtos/created-friend.dto';
import { FriendEntity } from '../../entities/friend.entity';
import { FriendService } from '../../services/friend/friend.service';

@Controller('friends')
export class FriendsController {
    constructor(private friendService: FriendService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    public async getFriends(@Req() req: Request): Promise<FriendEntity[]> {
        return this.friendService.getFriends((req.user as any).userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    public async requestFriend(@Req() req: Request, @Body() createdFriend: CreatedFriendDto): Promise<void> {
        return this.friendService.requestFriend((req.user as any).userId, createdFriend.userAccountId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':friendId')
    public async confirmFriend(@Req() req: Request, @Param('friendId') friendId: string): Promise<void> {
        return this.friendService.confirmFriend((req.user as any).userId, friendId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':friendId')
    public async deleteFriend(@Req() req: Request, @Param('friendId') friendId: string): Promise<void> {
        return this.friendService.deleteFriend((req.user as any).userId, friendId);
    }
}
