import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../shared/prisma/prisma.module';
import { ImageRepository } from '../application/ports/image.repository';
import { PrismaImageRepository } from './persistence/prisma-image.repository';
import { ImageUploaderService } from '../application/ports/image-uploader.service';
import { S3ImageUploaderService } from './s3-image-uploader.service';
import { ImageProcessingQueueService } from '../application/ports/image-processing-queue.service';
import { BullmqImageProcessingQueueService } from './image-processing/bullmq-image-processing-queue.service';
import { BullModule } from '@nestjs/bullmq';
import { IMAGE_PROCESSING_QUEUE } from './image-processing/constants';
import { ImageProcessingQueueConsumer } from './image-processing/image-processing-queue.consumer';
import { SharpService } from './image-processing/sharp.service';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({ name: IMAGE_PROCESSING_QUEUE }),
  ],
  providers: [
    {
      provide: ImageRepository,
      useClass: PrismaImageRepository,
    },
    {
      provide: ImageUploaderService,
      useClass: S3ImageUploaderService,
    },
    {
      provide: ImageProcessingQueueService,
      useClass: BullmqImageProcessingQueueService,
    },
    ImageProcessingQueueConsumer,
    SharpService,
  ],
  exports: [ImageRepository, ImageUploaderService, ImageProcessingQueueService],
})
export class InfrastructureModule {}
