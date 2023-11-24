import { Test, TestingModule } from '@nestjs/testing';
import { PerformerService } from './performer.service';
import { Repository } from 'typeorm';
import { PerformerEntity } from './performer.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('PerformerService', () => {
  let service: PerformerService;
  let repository: Repository<PerformerEntity>;
  let performersList: PerformerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PerformerService],
    }).compile();

    service = module.get<PerformerService>(PerformerService);
    repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    performersList = [];
    for (let i = 0; i < 5; i++) {
      const performer: PerformerEntity = await repository.save({
        id: faker.string.uuid(),
        nombre: faker.person.firstName(),
        imagen: faker.image.url(),
        descripcion: faker.lorem.paragraph(),
        albums: [],
      });
      performersList.push(performer);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all performers', async () => {
    const performers: PerformerEntity[] = await service.findAll();
    expect(performers.length).toEqual(performersList.length);
  });

  it('should get a performer by id', async () => {
    const performer: PerformerEntity = await service.findOne(performersList[0].id);
    expect(performer).toBeDefined();
    expect(performer.id).toEqual(performersList[0].id);
  });

  it('get should throw an error when the performer does not exist', async () => {
    await expect(() => service.findOne(faker.string.uuid())).rejects.toHaveProperty("message", "The performer with the given id was not found");
  });

  it('should create a performer', async () => {
    const performer: PerformerEntity = await service.create({
      id: faker.string.uuid(),
      nombre: faker.person.firstName(),
      imagen: faker.image.url(),
      descripcion: faker.lorem.paragraph({min:1,max:1}),
      albums: [],
    });
    expect(performer).toBeDefined();
    expect(performer.id).toBeDefined();
  });

  it('create should throw an error when the performer description is longer than 100 characters', async () => {
    await expect(() => service.create({
      id: faker.string.uuid(),
      nombre: faker.person.firstName(),
      imagen: faker.image.url(),
      descripcion: faker.lorem.paragraphs(2),
      albums: [],
    })).rejects.toHaveProperty("message", "The performer description cannot be longer than 100 characters");
  });
});
