import { ImageTitle } from '../image-title';

describe('ImageTitle', () => {
  describe('get value', () => {
    it('should return the value of the image title', () => {
      // given
      const imageTitle = ImageTitle.fromString('valid-title');

      // assert
      expect(imageTitle.value).toEqual('valid-title');
    });
  });

  describe('fromString', () => {
    it('should return an ImageTitle object', () => {
      // given
      const title = 'valid-title';
      const imageTitle = ImageTitle.fromString(title);

      // assert
      expect(imageTitle).not.toBeNull();
      expect(imageTitle).toBeInstanceOf(ImageTitle);
    });

    it('should throw an error if the value is not a valid string', () => {
      // given
      const invalidTitle = 123;

      // assert
      expect(() =>
        ImageTitle.fromString(invalidTitle as unknown as string),
      ).toThrow();
    });

    it('should throw an error if the value is empty string', () => {
      // given
      const emptyTitle = '';

      // assert
      expect(() => ImageTitle.fromString(emptyTitle)).toThrow();
    });

    it('should throw an error if the value is longer than 120 characters', () => {
      // given
      const longTitle = 'a'.repeat(121);

      // assert
      expect(() => ImageTitle.fromString(longTitle)).toThrow();
    });
  });

  describe('equals', () => {
    it('should return true if the image titles are equal', () => {
      // given
      const imageTitle1 = ImageTitle.fromString('valid-title');
      const imageTitle2 = ImageTitle.fromString('valid-title');

      // assert
      expect(imageTitle1.equals(imageTitle2)).toBeTruthy();
      expect(imageTitle2.equals(imageTitle1)).toBeTruthy();
    });

    it('should return false if the image titles are not equal', () => {
      // given
      const imageTitle1 = ImageTitle.fromString('valid-title');
      const imageTitle2 = ImageTitle.fromString('invalid-title');

      // assert
      expect(imageTitle1.equals(imageTitle2)).toBeFalsy();
      expect(imageTitle2.equals(imageTitle1)).toBeFalsy();
    });
  });
});
