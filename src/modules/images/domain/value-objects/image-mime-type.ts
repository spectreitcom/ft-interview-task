import { IsMimeType, Matches, validateSync } from 'class-validator';
import { allowedMimeTypeRegex } from '../../shared/utils';

export class ImageMimeType {
  @IsMimeType()
  @Matches(allowedMimeTypeRegex)
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
    this.validate();
  }

  private validate() {
    const result = validateSync(this);
    if (result.length > 0) {
      throw new Error('ImageMimeType validation failed');
    }
  }

  static fromString(value: string) {
    return new ImageMimeType(value);
  }

  get value() {
    return this._value;
  }

  equals(mimeType: ImageMimeType) {
    return this._value === mimeType._value;
  }
}
