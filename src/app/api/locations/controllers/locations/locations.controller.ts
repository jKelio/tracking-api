import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/app/common/security/guards/jwt-auth.guard';

import { UpdatedLocationDto } from '../../dtos/updated-location.dto';
import { LocationEntity } from '../../entities/location.entity';
import { LocationResourceMapper } from '../../mappers/location-resource.mapper';
import { LocationResource } from '../../resources/location.resource';
import { LocationService } from '../../services/location/location.service';

@Controller('locations')
export class LocationsController {
    constructor(
        private locatonService: LocationService,
        private mapper: LocationResourceMapper,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    public async createOrUpdateLocation(
        @Req() req: Request,
        @Body() dto: UpdatedLocationDto,
    ): Promise<void> {
        return this.locatonService.createOrUpdateLocation(
            (req.user as any).userId,
            dto.latitude,
            dto.longitude,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    public async getLocations(@Req() req: Request): Promise<LocationResource[]> {
        return this.mapper.toResources(
            await this.locatonService.getLocations((req.user as any).userId),
        );
    }
}
