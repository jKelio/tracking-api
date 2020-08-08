import { Injectable } from '@nestjs/common';

import { LocationEntity } from '../../entities/location.entity';
import { LocationResource } from '../../resources/location.resource';

@Injectable()
export class LocationService {
  private locations: LocationEntity[] = [
    new LocationEntity('test-id', new Date(), 40.7143528, -74.0059731),
  ];

  constructor() {}

  public async createOrUpdateLocation(
    userId: string,
    latitude: number,
    longitude: number,
  ): Promise<void> {
    const location = this.locations.find(l => l.getUserId() === userId);
    if (location) {
      location.setLatitude(latitude);
      location.setLongitude(longitude);
    } else {
      this.locations.push(
        new LocationEntity(userId, new Date(), latitude, longitude),
      );
    }
  }

  public async getLocations(userId: string): Promise<LocationEntity[]> {
    return this.locations;
  }
}
