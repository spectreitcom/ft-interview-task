import { ImageMimeType } from '../image-mime-type';

const JPEG_MIME_TYPE = 'image/jpeg';
const PNG_MIME_TYPE = 'image/png';
const WEBP_MIME_TYPE = 'image/webp';
const GIF_MIME_TYPE = 'image/gif';
const TIFF_MIME_TYPE = 'image/tiff';

describe('ImageMimeType', () => {
  describe('fromString', () => {
    it('should return an ImageMimeType object', () => {
      // given
      const jpegMimeType = ImageMimeType.fromString(JPEG_MIME_TYPE);
      const pngMimeType = ImageMimeType.fromString(PNG_MIME_TYPE);
      const webpMimeType = ImageMimeType.fromString(WEBP_MIME_TYPE);
      const gifMimeType = ImageMimeType.fromString(GIF_MIME_TYPE);
      const tiffMimeType = ImageMimeType.fromString(TIFF_MIME_TYPE);

      // assert
      expect(jpegMimeType).toBeInstanceOf(ImageMimeType);
      expect(pngMimeType).toBeInstanceOf(ImageMimeType);
      expect(webpMimeType).toBeInstanceOf(ImageMimeType);
      expect(gifMimeType).toBeInstanceOf(ImageMimeType);
      expect(tiffMimeType).toBeInstanceOf(ImageMimeType);
    });

    it('should throw an error if the value is not a valid mime type', () => {
      // given
      const invalidMimeType = 'invalid-mime-type';

      // assert
      expect(() => ImageMimeType.fromString(invalidMimeType)).toThrow();
    });
  });

  describe('equals', () => {
    it('should return true if the mime types are equal', () => {
      // given
      const mimeType1 = ImageMimeType.fromString(JPEG_MIME_TYPE);
      const mimeType2 = ImageMimeType.fromString(JPEG_MIME_TYPE);

      // assert
      expect(mimeType1.equals(mimeType2)).toBeTruthy();
      expect(mimeType2.equals(mimeType1)).toBeTruthy();
    });

    it('should return false if the mime types are not equal', () => {
      // given
      const mimeType1 = ImageMimeType.fromString(JPEG_MIME_TYPE);
      const mimeType2 = ImageMimeType.fromString(PNG_MIME_TYPE);

      // assert
      expect(mimeType1.equals(mimeType2)).toBeFalsy();
      expect(mimeType2.equals(mimeType1)).toBeFalsy();
    });
  });

  describe('get value', () => {
    it('should return the mime type', () => {
      // given
      const mimeType = ImageMimeType.fromString(JPEG_MIME_TYPE);

      // assert
      expect(mimeType.value).toBe(JPEG_MIME_TYPE);
    });
  });
});
