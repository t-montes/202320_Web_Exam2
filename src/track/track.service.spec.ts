import { Test, TestingModule } from '@nestjs/testing';
import { TrackService } from './track.service';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('TrackService', () => {
  let service: TrackService;
  let repository: Repository<TrackEntity>;
  let tracksList: TrackEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TrackService],
    }).compile();

    service = module.get<TrackService>(TrackService);
    repository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    tracksList = [];
    for (let i = 0; i < 5; i++) {
      const track: TrackEntity = await repository.save({
        id: faker.string.uuid(),
        nombre: faker.music.songName(),
        duracion: faker.number.int(),
        album: null,
      });
      tracksList.push(track);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all tracks', async () => {
    const tracks: TrackEntity[] = await service.findAll();
    expect(tracks.length).toEqual(tracksList.length);
  });

  it('should get a track by id', async () => {
    const track: TrackEntity = await service.findOne(tracksList[0].id);
    expect(track).toBeDefined();
    expect(track.id).toEqual(tracksList[0].id);
  });

  it('get should throw an error when the track does not exist', async () => {
    await expect(() => service.findOne(faker.string.uuid())).rejects.toHaveProperty("message", "The track with the given id was not found");
  });

  it('should create a track', async () => {
    const track: TrackEntity = await service.create({
      id: faker.string.uuid(),
      nombre: faker.music.songName(),
      duracion: faker.number.int(),
      album: null,
    });
    expect(track).toBeDefined();
    expect(track.id).toBeDefined();
  });

  it('create should throw an error when the duration is negative', async () => {
    await expect(() => service.create({
      id: faker.string.uuid(),
      nombre: faker.music.songName(),
      duracion: -1,
      album: null,
    })).rejects.toHaveProperty("message", "The duration of the track must be a positive number");
  });
});
