export class FriendEntity {


    private id: string;
    private friendRequestAt: Date;
    private friendRequestBy: string;
    private friendResponseAt: Date;
    private friendResponseBy: string;

    constructor(
        id: string,
        friendRequestAt: Date,
        friendRequestBy: string,
        friendResposneAt: Date,
        friendResponseBy: string,
    ) {
        this.id = id;
        this.friendRequestAt = friendRequestAt;
        this.friendRequestBy = friendRequestBy;
        this.friendResponseAt = friendResposneAt;
        this.friendResponseBy = friendResponseBy;
    }

    public getId(): string {
        return this.id;
    }

    public getFriendRequestAt(): Date {
        return this.friendRequestAt;
    }

    public getFriendRequestBy(): string {
        return this.friendRequestBy;
    }

    public getFriendResponseAt(): Date {
        return this.friendResponseAt;
    }

    public setFriendResponseAt(friendConfirmationTimestamp: Date): void {
        this.friendResponseAt = friendConfirmationTimestamp;
    }

    public getFriendResponseBy(): string {
        return this.friendResponseBy;
    }

    public compareUserAccountId(userAccountId: string): boolean {
        return this.getFriendRequestBy() === userAccountId || this.getFriendResponseBy() === userAccountId;
    }

    public static builder(): FriendEntityBuilder {
        return new FriendEntityBuilder(new FriendEntity(null, null, null, null, null));
    }
}

export class FriendEntityBuilder {

    private userId: string;
    private friendRequestAt: Date;
    private friendRequestBy: string;
    private friendResponseAt: Date;
    private friendResponseBy: string;

    constructor(friend: FriendEntity) {
        this.userId = friend.getId();
        this.friendRequestAt = friend.getFriendRequestAt();
        this.friendRequestBy = friend.getFriendRequestBy();
        this.friendResponseAt = friend.getFriendResponseAt();
        this.friendResponseBy = friend.getFriendResponseBy();
    }

    public setUserId(userId: string): FriendEntityBuilder {
        this.userId = userId;
        return this;
    }

    public setFriendRequestAt(friendRequestAt: Date): FriendEntityBuilder {
        this.friendRequestAt = friendRequestAt
        return this;
    }

    public setFriendRequestBy(friendRequestBy: string): FriendEntityBuilder {
        this.friendRequestBy = friendRequestBy;
        return this;
    }

    public setFriendResponseAt(friendResponseAt: Date): FriendEntityBuilder {
        this.friendResponseAt = friendResponseAt;
        return this;
    }

    public setFriendResponseBy(friendResponseBy: string): FriendEntityBuilder {
        this.friendResponseBy = friendResponseBy;
        return this;
    }

    public build(): FriendEntity {
        return new FriendEntity(
            this.userId,
            this.friendRequestAt,
            this.friendRequestBy,
            this.friendResponseAt,
            this.friendResponseBy,
        );
    }
}