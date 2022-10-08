import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ad, AdsSchema } from 'src/schemas/ads.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ad.name, schema: AdsSchema }]),
    AuthModule,
  ],
  providers: [AdsService],
  controllers: [AdsController],
})
export class AdsModule {}
