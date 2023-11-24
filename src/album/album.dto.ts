import { IsNotEmpty, IsString, IsDate, IsUrl } from 'class-validator';

export class AlbumDto {
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsUrl()
    readonly caratula: string;

    @IsNotEmpty()
    @IsDate()
    readonly fecha: Date;

    @IsNotEmpty()
    @IsString()
    readonly descripcion: string;
}
