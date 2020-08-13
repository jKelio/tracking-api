import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
    PreconditionFailedException,
} from '@nestjs/common';
import { UserAccountService } from 'src/app/common/user-accounts/services/user-account/user-account.service';
import { v4 as generateUniqueUniversallyIdentifier } from 'uuid';

import { FriendEntity } from '../../entities/friend.entity';

@Injectable()
export class FriendService {

    private friends: FriendEntity[] = [];

    constructor(private userAccountService: UserAccountService) { }

    public async getFriends(userAccountId: string): Promise<FriendEntity[]> {
        const friends = this.friends.filter(f => f.compareUserAccountId(userAccountId));
        return friends ? friends : [];
    }

    public async requestFriend(userAccountId: string, friendAccountId: string): Promise<void> {
        const friendRequestAt: Date = new Date;
        await this.addFriend(
            userAccountId,
            FriendEntity.builder()
                .setUserId(generateUniqueUniversallyIdentifier())
                .setFriendRequestAt(friendRequestAt)
                .setFriendRequestBy(userAccountId)
                .setFriendResponseBy(friendAccountId)
                .build(),
        );
    }

    private async addFriend(userAccountId: string, friend: FriendEntity): Promise<void | never> {
        const userAccount = await this.userAccountService.findById(friend.getFriendResponseBy());
        if (!userAccount) {
            throw new NotFoundException('could not find user account id');
        }
        if (userAccount.getId() === userAccountId) {
            throw new BadRequestException('could not request current user as friend');
        }
        const friends = await this.getFriends(userAccountId);
        if (friends.find(f => f.compareUserAccountId(friend.getFriendResponseBy()))) {
            throw new ConflictException('friend is already requested');
        }
        this.friends.push(friend);
    }

    public async confirmFriend(userAccountId: string, friendId: string): Promise<void> {
        const friendConfirmedAt: Date = new Date();
        await this.validateFriend(userAccountId, friendId)
        await this.updateFriend(userAccountId, friendId, friendConfirmedAt);
    }

    public async deleteFriend(userAccountId: string, friendId: string): Promise<void> {
        const friends = await this.getFriends(userAccountId);
        if (!friends.find(f => f.getId() === friendId)) {
            throw new NotFoundException('could not find friend to delete');
        }
        this.friends = this.friends.filter(f => f.getId() !== friendId);
    }

    private async updateFriend(userAccountId: string, friendAccountId: string, friendConfirmedAt: Date): Promise<void> {
        const friend = await this.findFriend(userAccountId, friendAccountId);
        friend.setFriendResponseAt(friendConfirmedAt);
    }

    private async validateFriend(userAccountId: string, friendId: string): Promise<void> {
        const friend = await this.findFriend(userAccountId, friendId);
        if (!friend) {
            throw new NotFoundException('could not find requested friend');
        }
        if (userAccountId !== friend.getFriendResponseBy()) {
            throw new PreconditionFailedException('could not find requested friend');
        }
        if (friend.getFriendResponseAt()) {
            throw new BadRequestException('requested friend is already confirmed');
        }
    }

    private async findFriend(userAccountId: string, friendId: string): Promise<FriendEntity> {
        const friends = await this.getFriends(userAccountId);
        return friends.find(f => f.getId() === friendId);
    }
}
