import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ImageProcessingFinishedEvent } from '../../domain/events/image-processing-finished.event';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';

@EventsHandler(ImageProcessingFinishedEvent)
export class ImageProcessingFinishedEventHandler implements IEventHandler<ImageProcessingFinishedEvent> {
  private readonly logger = new Logger(
    ImageProcessingFinishedEventHandler.name,
  );

  constructor(private readonly prismaService: PrismaService) {}

  async handle(event: ImageProcessingFinishedEvent) {
    this.logger.log(`Image processing finished for image ${event.imageId}`);

    const { imageId, title, width, height, url } = event;

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
