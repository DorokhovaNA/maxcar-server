import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ad, AdsSchema } from '../schemas/ads.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ad.name, schema: AdsSchema }]),
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
  ],
  providers: [AdsService],
  controllers: [AdsController],
})
export class AdsModule {}
