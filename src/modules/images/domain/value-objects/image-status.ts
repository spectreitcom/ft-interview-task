import { IsIn, validateSync } from 'class-validator';

export const PROCESSING_STATUS = 'PROCESSING';
export const PROCESSED_STATUS = 'PROCESSED';
export const FAILED_STATUS = 'FAILED';

export class ImageStatus {
  @IsIn([PROCESSING_STATUS, PROCESSED_STATUS, FAILED_STATUS])
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
    this.validate();
  }

  private validate() {
    const result = validateSync(this);
    if (result.length > 0) {
      throw new Error('ImageStatus validation failed');
    }
  }

  get value() {
    return this._value;
  }

  static processing() {
    return new ImageStatus(PROCESSING_STATUS);
  }

  static processed() {
    return new ImageStatus(PROCESSED_STATUS);
  }

  static failed() {
    return new ImageStatus(FAILED_STATUS);
  }

  static fromString(value: string) {
    return new ImageStatus(value);
  }

  equals(status: ImageStatus) {
    return this._value === status.value;
  }
}
