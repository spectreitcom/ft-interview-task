import { ImageId } from '../image-id';
import { randomUUID } from 'node:crypto';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('ImageId', () => {
  describe('get value', () => {
    it('should return value', () => {
      // given
      const imageId = ImageId.create();

      // assert
      expect(imageId.value).toBeDefined();
      expect(imageId.value).toMatch(UUID_REGEX);
    });
  });

  describe('create', () => {
    it('should create an image id', () => {
      // given
      const imageId = ImageId.create();

      // assert
      expect(imageId).not.toBeNull();
      expect(imageId).toBeInstanceOf(ImageId);
    });
  });

  describe('fromString', () => {
    it('should return an ImageId object', () => {
      // given
      const uuid = randomUUID();
      const imageId = ImageId.fromString(uuid);

      // assert
      expect(imageId).not.toBeNull();
      expect(imageId).toBeInstanceOf(ImageId);
      expect(imageId.value).toEqual(uuid);
    });

    it('should throw an error if the value is not a valid uuid', () => {
      // given
      const invalidUuid = 'invalid-uuid';

      // assert
      expect(() => ImageId.fromString(invalidUuid)).toThrow();
    });
  });

  describe('equals', () => {
    it('should return true if the image ids are equal', () => {
      // given
      const imageId1 = ImageId.create();
      const imageId2 = ImageId.fromString(imageId1.value);

      // assert
      expect(imageId1.equals(imageId2)).toBeTruthy();
      expect(imageId2.equals(imageId1)).toBeTruthy();
    });

    it('should return false if the image ids are not equal', () => {
      // given
      const imageId1 = ImageId.create();
      const imageId2 = ImageId.create();

      // assert
      expect(imageId1.equals(imageId2)).toBeFalsy();
      expect(imageId2.equals(imageId1)).toBeFalsy();
    });
  });
});
