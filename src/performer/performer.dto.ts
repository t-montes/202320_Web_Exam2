import { IsString, IsUrl } from 'class-validator';

export class PerformerDto {
    @IsString()
    readonly nombre: string;

    @IsUrl()
    readonly imagen: string;

    @IsString()
    readonly descripcion: string;
}
