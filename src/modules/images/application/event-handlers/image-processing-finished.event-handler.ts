import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ImageProcessingFinishedEvent } from '../../domain/events/image-processing-finished.event';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { ImageUploaderService } from '../ports/image-uploader.service';

@EventsHandler(ImageProcessingFinishedEvent)
export class ImageProcessingFinishedEventHandler implements IEventHandler<ImageProcessingFinishedEvent> {
  private readonly logger = new Logger(
    ImageProcessingFinishedEventHandler.name,
  );

  constructor(
    private readonly prismaService: PrismaService,
    private readonly uploadService: ImageUploaderService,
  ) {}

  async handle(event: ImageProcessingFinishedEvent) {
    this.logger.log(`Image processing finished for image ${event.imageId}`);

    const { imageId, title, width, height, storageKey } = event;

    const url = this.uploadService.getObjectUrl(storageKey);

    await this.prismaService.imageRead.create({
      data: {
        imageId,
        title,
        width,
        height,
        url,
      },
    });
  }
}
