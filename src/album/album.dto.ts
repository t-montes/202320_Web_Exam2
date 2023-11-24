import { IsString, IsISO8601, IsUrl } from 'class-validator';

export class AlbumDto {
    @IsString()
    readonly nombre: string;

    @IsUrl()
    readonly caratula: string;

    @IsISO8601()
    readonly fecha: Date;

    @IsString()
    readonly descripcion: string;
}
