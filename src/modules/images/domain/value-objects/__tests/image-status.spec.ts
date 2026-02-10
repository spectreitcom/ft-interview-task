import {
  FAILED_STATUS,
  ImageStatus,
  PROCESSED_STATUS,
  PROCESSING_STATUS,
} from '../image-status';

describe('ImageStatus', () => {
  describe('processing', () => {
    it('should return ImageStatus with PROCESSING value', () => {
      // given
      const imageStatus = ImageStatus.processing();

      // assert
      expect(imageStatus.value).toEqual(PROCESSING_STATUS);
    });
  });

  describe('processed', () => {
    it('should return ImageStatus with PROCESSED value', () => {
      // given
      const imageStatus = ImageStatus.processed();

      // assert
      expect(imageStatus.value).toEqual(PROCESSED_STATUS);
    });
  });

  describe('failed', () => {
    it('should return ImageStatus with FAILED value', () => {
      // given
      const imageStatus = ImageStatus.failed();

      // assert
      expect(imageStatus.value).toEqual(FAILED_STATUS);
    });
  });

  describe('equals', () => {
    it('should return true if the image statuses are equal', () => {
      // given
      const imageStatus1 = ImageStatus.processing();
      const imageStatus2 = ImageStatus.processing();

      // assert
      expect(imageStatus1.equals(imageStatus2)).toBeTruthy();
      expect(imageStatus2.equals(imageStatus1)).toBeTruthy();
    });

    it('should return false if the image statuses are not equal', () => {
      // given
      const imageStatus1 = ImageStatus.processing();
      const imageStatus2 = ImageStatus.processed();

      // assert
      expect(imageStatus1.equals(imageStatus2)).toBeFalsy();
      expect(imageStatus2.equals(imageStatus1)).toBeFalsy();
    });
  });

  describe('get value', () => {
    it('should return the value of the image status', () => {
      // given
      const imageStatus = ImageStatus.processing();

      // assert
      expect(imageStatus.value).toEqual(PROCESSING_STATUS);
    });
  });
});
