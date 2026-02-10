import { Image } from '../image';
import { ImageStatus } from '../value-objects/image-status';
import { ImageStatusChangeError } from '../exceptions';
import { randomUUID } from 'node:crypto';
import { ImageId } from '../value-objects/image-id';
import { ImageSize } from '../value-objects/image-size';
import { ImageMimeType } from '../value-objects/image-mime-type';
import { ImageTitle } from '../value-objects/image-title';

const JPEG_MIME_TYPE = 'image/jpeg';

describe('Image', () => {
  describe('constructor', () => {});

  describe('create', () => {});

  describe('finishProcessing', () => {
    it('should be able to finish processing an image', () => {
      // given
      const image = Image.create({
        imgHeight: 100,
        imgWidth: 200,
        imgTitle: 'valid-title',
        imgStorageKey: 'valid-storage-key',
        imgMimeType: JPEG_MIME_TYPE,
      });

      // act
      image.finishProcessing();

      // assert
      expect(image.getStatus().equals(ImageStatus.processed())).toBeTruthy();
    });

    it('should throw an error if the image has already failed status', () => {
      // given
      const image = Image.create({
        imgHeight: 100,
        imgWidth: 200,
        imgTitle: 'valid-title',
        imgStorageKey: 'valid-storage-key',
        imgMimeType: JPEG_MIME_TYPE,
      });

      // act
      image.failProcessing();

      // assert
      expect(() => image.finishProcessing()).toThrow();
      expect(() => image.finishProcessing()).toThrow(ImageStatusChangeError);
    });
  });

  describe('failProcessing', () => {
    it('should be able to fail processing an image', () => {
      // given
      const image = Image.create({
        imgHeight: 100,
        imgWidth: 200,
        imgTitle: 'valid-title',
        imgStorageKey: 'valid-storage-key',
        imgMimeType: JPEG_MIME_TYPE,
      });

      // act
      image.failProcessing();

      // assert
      expect(image.getStatus().equals(ImageStatus.failed())).toBeTruthy();
    });
  });

  describe('getImageId', () => {
    it('should return the image id', () => {
      // given
      const imageId = ImageId.fromString(randomUUID());
      const image = new Image(
        imageId,
        ImageSize.create(100, 200),
        'storage-key',
        ImageTitle.fromString('some title'),
        ImageMimeType.fromString(JPEG_MIME_TYPE),
      );

      // assert
      expect(image.getImageId().value).toEqual(imageId.value);
    });
  });

  describe('getTitle', () => {
    it('should return the image title', () => {
      // given
      const imageTitle = ImageTitle.fromString('some title');
      const image = new Image(
        ImageId.fromString(randomUUID()),
        ImageSize.create(100, 200),
        'storage-key',
        imageTitle,
        ImageMimeType.fromString(JPEG_MIME_TYPE),
      );

      // assert
      expect(image.getTitle().value).toEqual(imageTitle.value);
    });
  });

  describe('getStorageKey', () => {
    it('should return the storage key', () => {
      const storageKey = 'storage-key';
      const image = new Image(
        ImageId.fromString(randomUUID()),
        ImageSize.create(100, 200),
        storageKey,
        ImageTitle.fromString('some title'),
        ImageMimeType.fromString(JPEG_MIME_TYPE),
      );

      // assert
      expect(image.getStorageKey()).toEqual(storageKey);
    });
  });

  describe('getMimeType', () => {
    it('should return the image mime type', () => {
      // given
      const imageMimeType = ImageMimeType.fromString(JPEG_MIME_TYPE);
      const image = new Image(
        ImageId.fromString(randomUUID()),
        ImageSize.create(100, 200),
        'storage-key',
        ImageTitle.fromString('some title'),
        imageMimeType,
      );

      // assert
      expect(image.getMimeType().equals(imageMimeType)).toBeTruthy();
    });
  });

  describe('getImageSize', () => {
    it('should return the width of the image', () => {
      // given
      const image = new Image(
        ImageId.fromString(randomUUID()),
        ImageSize.create(100, 200),
        'storage-key',
        ImageTitle.fromString('some title'),
        ImageMimeType.fromString(JPEG_MIME_TYPE),
      );

      // assert
      expect(image.getImageSize().width).toEqual(100);
      expect(image.getImageSize().height).toEqual(200);
    });
  });
});
