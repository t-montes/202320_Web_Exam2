import { Controller, Body, Param, Get, Post } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { TrackService } from './track.service';
import { TrackEntity } from './track.entity';
import { TrackDto } from './track.dto';
import { plainToInstance } from 'class-transformer';

@Controller('tracks')
@UseInterceptors(BusinessErrorsInterceptor)
export class TrackController {
    constructor(private readonly trackService: TrackService) {}

    @Get()
    async findAll() {
        return await this.trackService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.trackService.findOne(id);
    }

    @Post()
    async create(@Body() track: TrackDto) {
        const trackEntity: TrackEntity = plainToInstance(TrackEntity, track);
        return await this.trackService.create(trackEntity);
    }
}
