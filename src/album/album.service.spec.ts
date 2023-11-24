import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumsList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    albumsList = [];
    for (let i = 0; i < 5; i++) {
      const album: AlbumEntity = await repository.save({
        id: faker.string.uuid(),
        nombre: faker.music.songName(),
        caratula: faker.image.url(),
        descripcion: faker.lorem.paragraph(),
        fecha: faker.date.past(),
        performers: [],
      });
      albumsList.push(album);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an album', async () => {
    const album: AlbumEntity = {
      id: "",
      nombre: faker.music.songName(),
      caratula: faker.image.url(),
      descripcion: faker.lorem.paragraph(),
      fecha: faker.date.past(),
      performers: [],
    };

    const createdAlbum: AlbumEntity = await service.create(album);
    expect(createdAlbum.id).toBeDefined();

    const persistedAlbum: AlbumEntity = await repository.findOne(
      {where: {id: createdAlbum.id}}
    );
    expect(persistedAlbum).toBeDefined();
    expect(persistedAlbum.nombre).toEqual(album.nombre);
  });

  it('should throw an error when the description is empty', async () => {
    const album: AlbumEntity = {
      id: "",
      nombre: faker.music.songName(),
      caratula: faker.image.url(),
      descripcion: "",
      fecha: faker.date.past(),
      performers: [],
    };

    await expect(() => service.create(album)).rejects.toHaveProperty("message", "The album description cannot be empty");
  });
});
