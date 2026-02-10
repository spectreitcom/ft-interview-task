import { IEvent } from '@nestjs/cqrs';

export class ImageProcessingFinishedEvent implements IEvent {
  constructor(
    public readonly imageId: string,
    public readonly title: string,
    public readonly width: number,
    public readonly height: number,
    public readonly storageKey: string,
  ) {}
}
