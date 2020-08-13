import { Module } from '@nestjs/common';
import { FriendsController } from './controllers/friends/friends.controller';
import { FriendService } from './services/friend/friend.service';

@Module({
  controllers: [FriendsController],
  providers: [FriendService]
})
export class FriendsModule {}
