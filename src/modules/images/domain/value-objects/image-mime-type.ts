import { IsIn, IsMimeType, validateSync } from 'class-validator';

export class ImageMimeType {
  @IsMimeType()
  @IsIn([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'image/tiff',
  ])
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
