import { IsNotEmpty, IsString, IsISO8601, IsUrl } from 'class-validator';

export class AlbumDto {
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsUrl()
    readonly caratula: string;

    @IsNotEmpty()
    @IsISO8601()
    readonly fecha: Date;

    @IsNotEmpty()
    @IsString()
    readonly descripcion: string;
}
