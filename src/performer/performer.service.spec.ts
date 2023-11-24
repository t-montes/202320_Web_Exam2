import { Test, TestingModule } from '@nestjs/testing';
import { PerformerService } from './performer.service';
import { Repository } from 'typeorm';
import { PerformerEntity } from './performer.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PerformerService', () => {
  let service: PerformerService;
  let repository: Repository<PerformerEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PerformerService],
    }).compile();

    service = module.get<PerformerService>(PerformerService);
    repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
