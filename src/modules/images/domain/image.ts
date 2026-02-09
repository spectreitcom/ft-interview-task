import { AggregateRoot } from '@nestjs/cqrs';
import { ImageId } from './value-objects/image-id';
import { ImageSize } from './value-objects/image-size';
import { ImageStatus } from './value-objects/image-status';
import { ImageStatusChangedEvent } from './events/image-status-changed.event';
import { ImageTitle } from './value-objects/image-title';
import { ImageCreatedEvent } from './events/image-created.event';
import { ProcessedImageEntity } from './entities/processed-image.entity';

type CreateImageInput = {
  imgWidth: number;
  imgHeight: number;
  storageKey: string;
  imgTitle: string;
};

export class Image extends AggregateRoot {
  private readonly imageId: ImageId;
  private readonly imageSize: ImageSize;
  private readonly storageKey: string;
  private readonly title: ImageTitle;
  private status: ImageStatus;
  private processedImage?: ProcessedImageEntity;

  constructor(
    imageId: ImageId,
    imageSize: ImageSize,
    storageKey: string,
    title: ImageTitle,
    processedImage?: ProcessedImageEntity,
  ) {
    super();
    this.imageId = imageId;
    this.imageSize = imageSize;
    this.storageKey = storageKey;
    this.title = title;
    this.status = ImageStatus.processing();
    this.processedImage = processedImage;
  }

  static create({
    imgHeight,
    imgTitle,
    imgWidth,
    storageKey,
  }: CreateImageInput) {
    const image = new Image(
      ImageId.create(),
      ImageSize.create(imgWidth, imgHeight),
      storageKey,
      ImageTitle.fromString(imgTitle),
    );

    image.apply(
      new ImageCreatedEvent(
        image.imageId.value,
        imgWidth,
        imgHeight,
        storageKey,
        imgTitle,
        image.status.value,
      ),
    );
    return image;
  }

  finishProcessing(processedImage: ProcessedImageEntity) {
    this.status = ImageStatus.processed();
    this.processedImage = processedImage;
    this.apply(
      new ImageStatusChangedEvent(
        this.imageId.value,
        this.status.value,
        processedImage.id,
      ),
    );
  }

  failProcessing() {
    this.status = ImageStatus.failed();
    this.apply(
      new ImageStatusChangedEvent(this.imageId.value, this.status.value),
    );
  }

  getImageId() {
    return this.imageId;
  }

  getImageSize() {
    return this.imageSize;
  }

  getStorageKey() {
    return this.storageKey;
  }

  getStatus() {
    return this.status;
  }

  getTitle() {
    return this.title;
  }

  getProcessedImage() {
    return this.processedImage;
  }
}
