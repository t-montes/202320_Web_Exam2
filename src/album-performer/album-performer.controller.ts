/**
 * 
 */

import { Controller, Param, Post } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { AlbumPerformerService } from './album-performer.service';

@Controller('albums/:albumId/performers')
export class AlbumPerformerController {
    constructor(private readonly albumPerformerService: AlbumPerformerService) {}

    @Post(':performerId')
    @UseInterceptors(BusinessErrorsInterceptor)
    async create(@Param('albumId') albumId: string, @Param('performerId') performerId: string) {
        return await this.albumPerformerService.addPerformerToAlbum(albumId, performerId);
    }
}
