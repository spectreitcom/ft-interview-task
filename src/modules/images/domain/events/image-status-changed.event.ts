import { IEvent } from '@nestjs/cqrs';

export class ImageStatusChangedEvent implements IEvent {
  constructor(
    public readonly imageId: string,
    public readonly newStatus: string,
    public readonly processedImageId?: string,
  ) {}
}
