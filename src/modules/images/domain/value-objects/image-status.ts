import { IsIn, validateSync } from 'class-validator';

const PROCESSING = 'PROCESSING';
const PROCESSED = 'PROCESSED';
const FAILED = 'FAILED';

export class ImageStatus {
  @IsIn([PROCESSING, PROCESSED, FAILED])
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
    return new ImageStatus(PROCESSING);
  }

  static processed() {
    return new ImageStatus(PROCESSED);
  }

  static failed() {
    return new ImageStatus(FAILED);
  }

  equals(status: ImageStatus) {
    return this._value === status.value;
  }
}
