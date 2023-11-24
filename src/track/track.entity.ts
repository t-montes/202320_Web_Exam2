import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';

@Entity()
export class TrackEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    duracion: number;

    @ManyToOne(type => AlbumEntity, album => album.tracks)
    album: AlbumEntity;
}
