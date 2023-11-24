import { Test, TestingModule } from '@nestjs/testing';
import { AlbumPerformerService } from './album-performer.service';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { PerformerEntity } from '../performer/performer.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('AlbumPerformerService', () => {
  let service: AlbumPerformerService;
  let albumRepository: Repository<AlbumEntity>;
  let performerRepository: Repository<PerformerEntity>;

  let performer: PerformerEntity;
  let album: AlbumEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumPerformerService],
    }).compile();

    service = module.get<AlbumPerformerService>(AlbumPerformerService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    performerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    albumRepository.clear();
    performerRepository.clear();
    performer = await performerRepository.save({
      id: faker.string.uuid(),
      nombre: faker.person.firstName(),
      imagen: faker.image.url(),
      descripcion: faker.lorem.paragraph({min:1,max:1}),
      albums: [],
    });
    album = await albumRepository.save({
      id: faker.string.uuid(),
      nombre: faker.music.songName(),
      caratula: faker.image.url(),
      descripcion: faker.lorem.paragraph(),
      fecha: faker.date.past(),
      performers: [],
      tracks: [],
    });
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a performer to an album', async () => {
    const albumWithPerformer: AlbumEntity = await service.addPerformerToAlbum(album.id, performer.id);
    expect(albumWithPerformer.performers.length).toEqual(1);
    expect(albumWithPerformer.performers[0].id).toEqual(performer.id);
  });

  it('should throw an error when the album does not exist', async () => {
    await expect(() => service.addPerformerToAlbum(faker.string.uuid(), performer.id)).rejects.toHaveProperty("message", "The album with the given id was not found");
  });

  it('should throw an error when the performer does not exist', async () => {
    await expect(() => service.addPerformerToAlbum(album.id, faker.string.uuid())).rejects.toHaveProperty("message", "The performer with the given id was not found");
  });

  it('should throw an error when the album already has 3 performers', async () => {
    for (let i = 0; i < 3; i++) {
      const performer: PerformerEntity = await performerRepository.save({
        id: faker.string.uuid(),
        nombre: faker.person.firstName(),
        imagen: faker.image.url(),
        descripcion: faker.lorem.paragraph({min:1,max:1}),
        albums: [],
      });
      album = await albumRepository.save({
        id: faker.string.uuid(),
        nombre: faker.music.songName(),
        caratula: faker.image.url(),
        descripcion: faker.lorem.paragraph(),
        fecha: faker.date.past(),
        performers: [...album.performers, performer],
        tracks: [],
      });
    }
    await expect(() => service.addPerformerToAlbum(album.id, performer.id)).rejects.toHaveProperty("message", "The album cannot have more than 3 performers");
  });
});
