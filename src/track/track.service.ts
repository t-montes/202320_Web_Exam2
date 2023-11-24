import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(TrackEntity)
        private readonly trackRepository: Repository<TrackEntity>
    ){}

    async findAll(): Promise<TrackEntity[]> {
        return await this.trackRepository.find();
    }

    async findOne(id: string): Promise<TrackEntity> {
        const track: TrackEntity = await this.trackRepository.findOne(
            {where: {id}}
        );
        if(!track)
            throw new BusinessLogicException('The track with the given id was not found', BusinessError.NOT_FOUND);
        return track;
    }

    async create(track: TrackEntity): Promise<TrackEntity> {
        if(track.duracion < 0)
            throw new BusinessLogicException('The duration of the track must be a positive number', BusinessError.PRECONDITION_FAILED);
        return await this.trackRepository.save(track);
    }

    // no se pide en el enunciado
    async update(id: string, track: TrackEntity): Promise<TrackEntity> {
        if(track.duracion < 0)
            throw new BusinessLogicException('The duration of the track must be a positive number', BusinessError.PRECONDITION_FAILED);
        const persistedTrack: TrackEntity = await this.trackRepository.findOne(
            {where: {id}}
        );
        track.id = id;
        if(!persistedTrack)
            throw new BusinessLogicException('The track with the given id was not found', BusinessError.NOT_FOUND);
        return await this.trackRepository.save({...persistedTrack, ...track});
    }

    // no se pide en el enunciado
    async delete(id: string): Promise<void> {
        const track: TrackEntity = await this.trackRepository.findOne(
            {where: {id}}
        );
        if(!track)
            throw new BusinessLogicException('The track with the given id was not found', BusinessError.NOT_FOUND);
        await this.trackRepository.remove(track);
    }
}
