import { IMAGE_PROCESSING_QUEUE } from './constants';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { SharpService } from './sharp.service';
import { ImageRepository } from '../../application/ports/image.repository';
import { EventPublisher } from '@nestjs/cqrs';
import { ImageUploaderService } from '../../application/ports/image-uploader.service';

@Processor(IMAGE_PROCESSING_QUEUE)
export class ImageProcessingQueueConsumer extends WorkerHost {
  private readonly logger = new Logger(ImageProcessingQueueConsumer.name);

  constructor(
    private readonly sharpService: SharpService,
    private readonly imageRepository: ImageRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly imageUploaderService: ImageUploaderService,
  ) {
    super();
  }

  async process(job: Job<{ imageId: string }>): Promise<void> {
    this.logger.debug(`Processing image ${job.data.imageId}`);
    const image = await this.imageRepository.findById(job.data.imageId);
    if (!image) {
      this.logger.warn(`Image not found: ${job.data.imageId}`);
      return;
    }
    this.eventPublisher.mergeObjectContext(image);

    try {
      const originalImageBuffer =
        await this.imageUploaderService.getObjectFromStorage(
          image.getStorageKey(),
        );

      const scaledImageBuffer = await this.sharpService.scale(
        originalImageBuffer,
        image.getImageSize().width,
        image.getImageSize().height,
      );

      await this.imageUploaderService.overrideObject(
        image.getStorageKey(),
        scaledImageBuffer,
      );

      image.finishProcessing();
      await this.imageRepository.save(image);
      image.commit();
    } catch (e) {
      this.logger.error(`Failed to process image ${job.data.imageId}`, e);
      image.failProcessing();
      await this.imageRepository.save(image);
      image.commit();
    }
  }
}
