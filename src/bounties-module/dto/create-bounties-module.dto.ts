import { Type } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { BountyStatus } from '../enums/bounty-status.enum';

export class CreateBountyDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'La cantidad de bellys debe ser un número.' })
  @IsPositive({ message: 'La cantidad de bellys debe ser un número positivo.' })
  cantidadBellys: number;

  @IsEnum(BountyStatus, {
    message: 'El estado debe ser Wanted o Captured.',
  })
  @IsOptional()
  estado?: BountyStatus;

  @IsMongoId({ message: 'El id del pirata no es válido.' })
  @IsNotEmpty({ message: 'El campo pirata es obligatorio.' })
  pirata: string;
}