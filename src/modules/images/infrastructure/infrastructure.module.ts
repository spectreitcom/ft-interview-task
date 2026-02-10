import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../shared/prisma/prisma.module';
import { ImageRepository } from '../application/ports/image.repository';
import { PrismaImageRepository } from './persistence/prisma-image.repository';
import { ImageUploaderService } from '../application/ports/image-uploader.service';
import { S3ImageUploaderService } from './s3-image-uploader.service';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: ImageRepository,
      useClass: PrismaImageRepository,
    },
    {
      provide: ImageUploaderService,
      useClass: S3ImageUploaderService,
    },
  ],
  exports: [ImageRepository, ImageUploaderService],
})
export class InfrastructureModule {}
