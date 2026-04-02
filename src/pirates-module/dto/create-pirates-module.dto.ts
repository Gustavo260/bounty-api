import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePirateDto {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  nombre: string;

  @IsString({ message: 'La tripulación debe ser un texto.' })
  @IsNotEmpty({ message: 'La tripulación no puede estar vacía.' })
  tripulacion: string;

  @IsBoolean({ message: 'tieneFrutaDelDiablo debe ser verdadero o falso.' })
  @IsOptional()
  tieneFrutaDelDiablo?: boolean;
}