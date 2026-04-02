import { PartialType } from '@nestjs/mapped-types';
import { CreateBountyDto } from './create-bounties-module.dto';

export class UpdateBountyDto extends PartialType(CreateBountyDto) {}