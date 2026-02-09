import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ImageCreatedEvent } from '../../domain/events/image-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(ImageCreatedEvent)
export class ImageCreatedEventHandler implements IEventHandler<ImageCreatedEvent> {
  private readonly logger = new Logger(ImageCreatedEventHandler.name);

  handle(event: ImageCreatedEvent) {
    this.logger.debug(JSON.stringify(event));
    // this handler does nothing
  }
}
