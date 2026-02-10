import { Injectable } from '@nestjs/common';
import { ImageProcessingQueueService } from '../../application/ports/image-processing-queue.service';
import { InjectQueue } from '@nestjs/bullmq';
import { IMAGE_PROCESSING_QUEUE } from './constants';
import { Queue } from 'bullmq';

@Injectable()
export class BullmqImageProcessingQueueService implements ImageProcessingQueueService {
  constructor(
    @InjectQueue(IMAGE_PROCESSING_QUEUE) private readonly queue: Queue,
  ) {}

  async enqueue(imageId: string): Promise<void> {
    await this.queue.add('process-image', { imageId });
  }
}
