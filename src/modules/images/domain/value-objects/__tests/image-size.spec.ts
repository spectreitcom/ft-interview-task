import { ImageSize } from '../image-size';

describe('ImageSize', () => {
  describe('create', () => {
    it('should create an image size', () => {
      // given
      const width = 100;
      const height = 200;
      const imageSize = ImageSize.create(width, height);

      // assert
      expect(imageSize).not.toBeNull();
      expect(imageSize).toBeInstanceOf(ImageSize);
    });

    it('should throw an error if the width or height are not numbers', () => {
      // given
      const width = 'invalid-width';
      const height = 'invalid-height';

      // assert
      // @ts-ignore
      expect(() => ImageSize.create(width, height)).toThrow();
    });

    it('should throw an error if the width or height are negative', () => {
      // given
      const width = -100;
      const height = -200;

      // assert
      expect(() => ImageSize.create(width, height)).toThrow();
    });

    it('should throw an error if the width or height are greater than 500', () => {
      // given
      const width = 501;
      const height = 502;

      // assert
      expect(() => ImageSize.create(width, height)).toThrow();
    });

    it('should throw an error if the width or height are not integers', () => {
      // given
      const width = 100.5;
      const height = 200.5;

      // assert
      expect(() => ImageSize.create(width, height)).toThrow();
    });

    it('should throw an error if the width or height are not provided', () => {
      // given
      const width = undefined;
      const height = undefined;

      // assert
      // @ts-ignore
      expect(() => ImageSize.create(width, height)).toThrow();
    });
  });

  describe('equals', () => {
    it('should return true if the image sizes are equal', () => {
      // given
      const imageSize1 = ImageSize.create(100, 200);
      const imageSize2 = ImageSize.create(100, 200);

      // assert
      expect(imageSize1.equals(imageSize2)).toBeTruthy();
      expect(imageSize2.equals(imageSize1)).toBeTruthy();
    });

    it('should return false if the image sizes are not equal', () => {
      // given
      const imageSize1 = ImageSize.create(100, 200);
      const imageSize2 = ImageSize.create(200, 100);

      // assert
      expect(imageSize1.equals(imageSize2)).toBeFalsy();
      expect(imageSize2.equals(imageSize1)).toBeFalsy();
    });
  });

  describe('get width', () => {
    it('should return the width', () => {
      // given
      const width = 100;
      const height = 200;
      const imageSize = ImageSize.create(width, height);

      // assert
      expect(imageSize.width).toEqual(width);
    });
  });

  describe('get height', () => {
    it('should return the height', () => {
      // given
      const width = 100;
      const height = 200;
      const imageSize = ImageSize.create(width, height);

      // assert
      expect(imageSize.height).toEqual(height);
    });
  });
});
