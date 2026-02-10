import { IMAGE_PROCESSING_QUEUE } from './constants';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor(IMAGE_PROCESSING_QUEUE)
export class ImageProcessingQueueConsumer extends WorkerHost {
  private readonly logger = new Logger(ImageProcessingQueueConsumer.name);

  async process(job: Job<{ imageId: string }>): Promise<void> {
    this.logger.debug(`Processing image ${job.data.imageId}`);
  }
}
