import { Module } from '@nestjs/common';

import { LocationsController } from './controllers/locations/locations.controller';
import { LocationResourceMapper } from './mappers/location-resource.mapper';
import { LocationService } from './services/location/location.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationService, LocationResourceMapper],
})
export class LocationsModule {}
