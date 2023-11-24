import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformerEntity } from './performer.entity';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class PerformerService {
    constructor(
        @InjectRepository(PerformerEntity)
        private readonly performerRepository: Repository<PerformerEntity>
    ){}

    async findAll(): Promise<PerformerEntity[]> {
        return await this.performerRepository.find();
    }

    async findOne(id: string): Promise<PerformerEntity> {
        const performer: PerformerEntity = await this.performerRepository.findOne(
            {where: {id}}
        );
        if(!performer)
            throw new BusinessLogicException('The performer with the given id was not found', BusinessError.NOT_FOUND);
        return performer;
    }

    async create(performer: PerformerEntity): Promise<PerformerEntity> {
        if (performer.descripcion.length > 100)
            throw new BusinessLogicException('The performer description cannot be longer than 100 characters', BusinessError.PRECONDITION_FAILED);
        return await this.performerRepository.save(performer);
    }

    // no se pide en el enunciado
    async update(id: string, performer: PerformerEntity): Promise<PerformerEntity> {
        if (performer.descripcion.length > 100)
            throw new BusinessLogicException('The performer description cannot be longer than 100 characters', BusinessError.PRECONDITION_FAILED);
        const persistedPerformer: PerformerEntity = await this.performerRepository.findOne(
            {where: {id}}
        );
        performer.id = id;
        if(!persistedPerformer)
            throw new BusinessLogicException('The performer with the given id was not found', BusinessError.NOT_FOUND);
        return await this.performerRepository.save({...persistedPerformer, ...performer});
    }

    // no se pide en el enunciado
    async delete(id: string): Promise<void> {
        const performer: PerformerEntity = await this.performerRepository.findOne(
            {where: {id}}
        );
        if(!performer)
            throw new BusinessLogicException('The performer with the given id was not found', BusinessError.NOT_FOUND);
        await this.performerRepository.remove(performer);
    }
}
