import { IsString, IsNumber } from 'class-validator';

export class TrackDto {
    @IsString()
    readonly nombre: string;

    @IsNumber()
    readonly duracion: number;
}
