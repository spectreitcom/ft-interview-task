import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ImageProcessingFailedEvent } from '../../domain/events/image-processing-failed.event';
import { Logger } from '@nestjs/common';

@EventsHandler(ImageProcessingFailedEvent)
export class ImageProcessingFailedEventHandler implements IEventHandler<ImageProcessingFailedEvent> {
  private readonly logger = new Logger(ImageProcessingFailedEventHandler.name);

  handle(event: ImageProcessingFailedEvent) {
    this.logger.debug(JSON.stringify(event));
    // this handler does nothing
  }
}
