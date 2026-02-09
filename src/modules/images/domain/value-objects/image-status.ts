import { IsIn, validateSync } from 'class-validator';

const PROCESSING_STATUS = 'PROCESSING';
const PROCESSED_STATUS = 'PROCESSED';
const FAILED_STATUS = 'FAILED';

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

  equals(status: ImageStatus) {
    return this._value === status.value;
  }
}
