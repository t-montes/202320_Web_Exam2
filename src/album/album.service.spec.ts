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
        tracks: [],
      });
      albumsList.push(album);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all albums', async () => {
    const albums: AlbumEntity[] = await service.findAll();
    expect(albums.length).toEqual(albumsList.length);
  });

  it('should get an album by id', async () => {
    const album: AlbumEntity = await service.findOne(albumsList[0].id);
    expect(album).toBeDefined();
    expect(album.id).toEqual(albumsList[0].id);
  });

  it('get should throw an error when the album does not exist', async () => {
    await expect(() => service.findOne(faker.string.uuid())).rejects.toHaveProperty("message", "The album with the given id was not found");
  });

  it('should create an album', async () => {
    const album: AlbumEntity = {
      id: "",
      nombre: faker.music.songName(),
      caratula: faker.image.url(),
      descripcion: faker.lorem.paragraph(),
      fecha: faker.date.past(),
      performers: [],
      tracks: [],
    };

    const createdAlbum: AlbumEntity = await service.create(album);
    expect(createdAlbum.id).toBeDefined();

    const persistedAlbum: AlbumEntity = await repository.findOne(
      {where: {id: createdAlbum.id}}
    );
    expect(persistedAlbum).toBeDefined();
    expect(persistedAlbum.nombre).toEqual(album.nombre);
  });

  it('create should throw an error when the description is empty', async () => {
    const album: AlbumEntity = {
      id: "",
      nombre: faker.music.songName(),
      caratula: faker.image.url(),
      descripcion: "",
      fecha: faker.date.past(),
      performers: [],
      tracks: [],
    };

    await expect(() => service.create(album)).rejects.toHaveProperty("message", "The album description cannot be empty");
  });

  it('create should throw an error when the name is empty', async () => {
    const album: AlbumEntity = {
      id: "",
      nombre: "",
      caratula: faker.image.url(),
      descripcion: faker.lorem.paragraph(),
      fecha: faker.date.past(),
      performers: [],
      tracks: [],
    };

    await expect(() => service.create(album)).rejects.toHaveProperty("message", "The album name cannot be empty");
  });

  it('should delete an album', async () => {
    const album: AlbumEntity = await service.findOne(albumsList[0].id);
    await service.delete(album.id);
    await expect(() => service.findOne(album.id)).rejects.toHaveProperty("message", "The album with the given id was not found");
  });

  it('delete should throw an error when the album does not exist', async () => {
    await expect(() => service.delete(faker.string.uuid())).rejects.toHaveProperty("message", "The album with the given id was not found");
  });
});
