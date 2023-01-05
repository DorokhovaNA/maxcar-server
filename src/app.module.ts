import { UsersModule } from './users/users.module';
import { MongooseConfigService } from './config/MongooseConfigService';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AdsModule } from './ads/ads.module';
import configuration from './config/configuration';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vercel-admin-user:YyRViFpyOa8NzuAc@cluster0.9syoddj.mongodb.net/Maxcar?retryWrites=true&w=majority',
    ),
    // ConfigModule.forRoot({
    //   load: [configuration],
    // }),
    UsersModule,
    AuthModule,
    AdsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
