import { IsNotEmpty, IsString, IsNumber, IsUrl } from 'class-validator';

export class TrackDto {
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsNumber()
    readonly duracion: number;
}
