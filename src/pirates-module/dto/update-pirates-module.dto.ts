import { PartialType } from '@nestjs/mapped-types';
import { CreatePirateDto } from './create-pirates-module.dto';

export class UpdatePirateDto extends PartialType(CreatePirateDto) {}