import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { PerformerEntity } from '../performer/performer.entity';

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

    @ManyToMany(type => AlbumEntity, album => album.performers)
    @JoinTable()
    performers: PerformerEntity[];
}
