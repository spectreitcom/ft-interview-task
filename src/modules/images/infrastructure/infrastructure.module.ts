import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../shared/prisma/prisma.module';
import { ImageRepository } from '../application/ports/image.repository';
import { PrismaImageRepository } from './persistence/prisma-image.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: ImageRepository,
      useClass: PrismaImageRepository,
    },
  ],
  exports: [ImageRepository],
})
export class InfrastructureModule {}
