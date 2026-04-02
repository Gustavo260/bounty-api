import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PiratesController } from './pirates-module.controller';
import { PiratesService } from './pirates-module.service';
import { Pirate, PirateSchema } from './schemas/pirate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pirate.name, schema: PirateSchema },
    ]),
  ],
  controllers: [PiratesController],
  providers: [PiratesService],
  exports: [PiratesService],
})
export class PiratesModule {}