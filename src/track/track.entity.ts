import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrackEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    duracion: number;
}
