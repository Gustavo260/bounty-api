import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PiratesModule } from './pirates-module/pirates-module.module';
import { BountiesModule } from './bounties-module/bounties-module.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL as string),
    PiratesModule,
    BountiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}