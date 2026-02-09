import { AggregateRoot } from '@nestjs/cqrs';
import { ImageId } from './value-objects/image-id';
import { ImageSize } from './value-objects/image-size';
import { ImageStatus } from './value-objects/image-status';
import { ImageTitle } from './value-objects/image-title';
import { ImageCreatedEvent } from './events/image-created.event';
import { ProcessedImageEntity } from './entities/processed-image.entity';
import { ImageProcessingFinishedEvent } from './events/image-processing-finished.event';
import { ImageProcessingFailedEvent } from './events/image-processing-failed.event';

type CreateImageInput = {
  imgWidth: number;
  imgHeight: number;
  objectKey: string;
  imgTitle: string;
};

export class Image extends AggregateRoot {
  private readonly imageId: ImageId;
  private readonly imageSize: ImageSize;
  private readonly objectKey: string;
  private readonly title: ImageTitle;
  private status: ImageStatus;
  private processedImage?: ProcessedImageEntity;

  constructor(
    imageId: ImageId,
    imageSize: ImageSize,
    objectKey: string,
    title: ImageTitle,
    processedImage?: ProcessedImageEntity,
  ) {
    super();
    this.imageId = imageId;
    this.imageSize = imageSize;
    this.objectKey = objectKey;
    this.title = title;
    this.status = ImageStatus.processing();
    this.processedImage = processedImage;
  }

  static create({
    imgHeight,
    imgTitle,
    imgWidth,
    objectKey,
  }: CreateImageInput) {
    const image = new Image(
      ImageId.create(),
      ImageSize.create(imgWidth, imgHeight),
      objectKey,
      ImageTitle.fromString(imgTitle),
    );

    image.apply(
      new ImageCreatedEvent(
        image.imageId.value,
        imgWidth,
        imgHeight,
        objectKey,
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
      new ImageProcessingFinishedEvent(
        this.imageId.value,
        this.title.value,
        this.imageSize.width,
        this.imageSize.height,
        processedImage.url,
      ),
    );
  }

  failProcessing() {
    this.status = ImageStatus.failed();
    this.apply(new ImageProcessingFailedEvent(this.imageId.value));
  }

  getImageId() {
    return this.imageId;
  }

  getImageSize() {
    return this.imageSize;
  }

  getObjectKey() {
    return this.objectKey;
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

  get hasProcessedImage() {
    return !!this.processedImage;
  }
}
