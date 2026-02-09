import { AggregateRoot } from '@nestjs/cqrs';
import { ImageId } from './value-objects/image-id';
import { ImageSize } from './value-objects/image-size';
import { ImageStatus } from './value-objects/image-status';
import { ImageTitle } from './value-objects/image-title';
import { ImageCreatedEvent } from './events/image-created.event';
import { ImageProcessingFinishedEvent } from './events/image-processing-finished.event';
import { ImageProcessingFailedEvent } from './events/image-processing-failed.event';
import { ImageMimeType } from './value-objects/image-mime-type';
import { ImageUrl } from './value-objects/image-url';

type CreateImageInput = {
  imgWidth: number;
  imgHeight: number;
  storageKey: string;
  imgTitle: string;
  imgMimeType: string;
};

export class Image extends AggregateRoot {
  private readonly imageId: ImageId;
  private readonly imageSize: ImageSize;
  private readonly storageKey: string;
  private readonly title: ImageTitle;
  private readonly mimeType: ImageMimeType;
  private status: ImageStatus;
  private url?: ImageUrl;

  constructor(
    imageId: ImageId,
    imageSize: ImageSize,
    storageKey: string,
    title: ImageTitle,
    mimeType: ImageMimeType,
    url?: ImageUrl,
  ) {
    super();
    this.imageId = imageId;
    this.imageSize = imageSize;
    this.storageKey = storageKey;
    this.title = title;
    this.status = ImageStatus.processing();
    this.mimeType = mimeType;
    this.url = url;
  }

  static create({
    imgHeight,
    imgTitle,
    imgWidth,
    storageKey,
    imgMimeType,
  }: CreateImageInput) {
    const image = new Image(
      ImageId.create(),
      ImageSize.create(imgWidth, imgHeight),
      storageKey,
      ImageTitle.fromString(imgTitle),
      ImageMimeType.fromString(imgMimeType),
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

  finishProcessing(url: string) {
    this.status = ImageStatus.processed();
    this.url = ImageUrl.fromString(url);
    this.apply(
      new ImageProcessingFinishedEvent(
        this.imageId.value,
        this.title.value,
        this.imageSize.width,
        this.imageSize.height,
        url,
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

  getStorageKey() {
    return this.storageKey;
  }

  getStatus() {
    return this.status;
  }

  getTitle() {
    return this.title;
  }

  getMimeType() {
    return this.mimeType;
  }

  getUrl() {
    return this.url;
  }
}
