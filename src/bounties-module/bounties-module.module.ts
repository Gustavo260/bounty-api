import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BountiesController } from './bounties-module.controller';
import { BountiesService } from './bounties-module.service';
import { Bounty, BountySchema } from './schemas/bounty.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bounty.name, schema: BountySchema },
    ]),
  ],
  controllers: [BountiesController],
  providers: [BountiesService],
  exports: [BountiesService],
})
export class BountiesModule {}