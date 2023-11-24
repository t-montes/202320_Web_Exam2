import { Controller, Body, Param, Get, Post, Delete, HttpCode } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
import { AlbumDto } from './album.dto';
import { plainToInstance } from 'class-transformer';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Get()
    async findAll() {
        return await this.albumService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.albumService.findOne(id);
    }

    @Post()
    async create(@Body() album: AlbumDto) {
        const albumEntity: AlbumEntity = plainToInstance(AlbumEntity, album);
        return await this.albumService.create(albumEntity);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        return await this.albumService.delete(id);
    }
}
