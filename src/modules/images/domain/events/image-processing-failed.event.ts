import { IEvent } from '@nestjs/cqrs';

export class ImageProcessingFailedEvent implements IEvent {
  constructor(public readonly imageId: string) {}
}
