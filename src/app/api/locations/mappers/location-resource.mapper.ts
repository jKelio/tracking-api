import { Injectable } from '@nestjs/common';

import { LocationEntity } from '../entities/location.entity';
import { LocationResource } from '../resources/location.resource';

@Injectable()
export class LocationResourceMapper {
  public toResources(entities: LocationEntity[]): LocationResource[] {
    return entities.map(this.toResource.bind(this));
  }

  public toResource(entity: LocationEntity): LocationResource {
    return new LocationResource(
      entity.getUserId(),
      entity.getLastUpdatedTimestamp(),
      entity.getLatitude(),
      entity.getLongitude(),
    );
  }
}
