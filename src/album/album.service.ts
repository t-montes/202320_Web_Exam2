import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ){}

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find();
    }

    async findOne(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne(
            {where: {id}}
        );
        if(!album)
            throw new BusinessLogicException('The album with the given id was not found', BusinessError.NOT_FOUND);
        return album;
    }

    async create(album: AlbumEntity): Promise<AlbumEntity> {
        if(album.nombre === '' || album.nombre === null || album.nombre === undefined)
            throw new BusinessLogicException('The album name cannot be empty', BusinessError.PRECONDITION_FAILED);
        if (album.descripcion === '' || album.descripcion === null || album.descripcion === undefined)
            throw new BusinessLogicException('The album description cannot be empty', BusinessError.PRECONDITION_FAILED);
        return await this.albumRepository.save(album);
    }

    // no se pide en el enunciado
    async update(id: string, album: AlbumEntity): Promise<AlbumEntity> {
        if(album.nombre === '' || album.nombre === null || album.nombre === undefined)
            throw new BusinessLogicException('The album name cannot be empty', BusinessError.PRECONDITION_FAILED);
        if (album.descripcion === '' || album.descripcion === null || album.descripcion === undefined)
            throw new BusinessLogicException('The album description cannot be empty', BusinessError.PRECONDITION_FAILED);
        const persistedAlbum: AlbumEntity = await this.albumRepository.findOne(
            {where: {id}}
        );
        album.id = id;
        if(!persistedAlbum)
            throw new BusinessLogicException('The album with the given id was not found', BusinessError.NOT_FOUND);
        return await this.albumRepository.save({...persistedAlbum, ...album});
    }

    async delete(id: string): Promise<void> {
        const album: AlbumEntity = await this.albumRepository.findOne(
            {where: {id}}
        );
        if(!album)
            throw new BusinessLogicException('The album with the given id was not found', BusinessError.NOT_FOUND);
        await this.albumRepository.remove(album);
    }
}
