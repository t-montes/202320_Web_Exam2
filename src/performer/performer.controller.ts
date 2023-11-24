import { Controller, Body, Param, Get, Post } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { PerformerService } from './performer.service';
import { PerformerEntity } from './performer.entity';
import { PerformerDto } from './performer.dto';
import { plainToInstance } from 'class-transformer';

@Controller('performers')
@UseInterceptors(BusinessErrorsInterceptor)
export class PerformerController {
    constructor(private readonly performerService: PerformerService) {}

    @Get()
    async findAll() {
        return await this.performerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.performerService.findOne(id);
    }

    @Post()
    async create(@Body() performer: PerformerDto) {
        const performerEntity: PerformerEntity = plainToInstance(PerformerEntity, performer);
        return await this.performerService.create(performerEntity);
    }
}
