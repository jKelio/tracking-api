export class LocationEntity {
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

  public getLastUpdatedTimestamp(): Date {
    return this.lastUpdatedTimestamp;
  }

  public setLastUpdatedTimestamp(lastUpdatedTimestamp: Date): void {
    this.lastUpdatedTimestamp = lastUpdatedTimestamp;
  }

  public getLatitude(): number {
    return this.latitude;
  }

  public setLatitude(latitude: number): void {
    this.latitude = latitude;
  }

  public getLongitude(): number {
    return this.longitude;
  }

  public setLongitude(longitude: number): void {
    this.longitude = longitude;
  }
}
