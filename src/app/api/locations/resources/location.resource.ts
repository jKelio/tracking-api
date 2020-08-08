export class LocationResource {
    private userId: string;
    private lastUpdatedTimestamp: Date;
    private latitude: number;
    private longitude: number;

    constructor(
        userId: string,
        lastUpdatedTimestamp: Date,
        latitude: number,
        longitude: number,
    ) {
        this.userId = userId;
        this.lastUpdatedTimestamp = lastUpdatedTimestamp;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getLastrUpdatedTimestamp(): Date {
        return this.lastUpdatedTimestamp;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public getLongitude(): number {
        return this.longitude;
    }
}