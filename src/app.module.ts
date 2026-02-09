import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '../env-schema';
import { ImagesModule } from './modules/images/application/images.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    CqrsModule.forRoot(),
    ImagesModule,
  ],
})
export class AppModule {}
