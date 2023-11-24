import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { PerformerEntity } from '../performer/performer.entity';
import { TrackEntity } from '../track/track.entity';

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    caratula: string;

    @Column()
    fecha: Date;

    @Column()
    descripcion: string;

    @ManyToMany(type => PerformerEntity, performer => performer.albums)
    @JoinTable()
    performers: PerformerEntity[];

    @OneToMany(type => TrackEntity, track => track.album)
    tracks: TrackEntity[];
}
