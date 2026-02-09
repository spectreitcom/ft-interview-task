import { IEvent } from '@nestjs/cqrs';

export class ImageCreatedEvent implements IEvent {
  constructor(
    public readonly imageId: string,
    public readonly imageWidth: number,
    public readonly imageHeight: number,
    public readonly storageKey: string,
    public readonly imageTitle: string,
    public readonly status: string,
  ) {}
}
