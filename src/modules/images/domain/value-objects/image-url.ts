import { IsUrl, validateSync } from 'class-validator';

export class ImageUrl {
  @IsUrl()
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
    this.validate();
  }

  private validate() {
    const result = validateSync(this);
    if (result.length > 0) {
      throw new Error('ImageUrl validation failed');
    }
  }

  static fromString(value: string) {
    return new ImageUrl(value);
  }

  get value() {
    return this._value;
  }

  equals(url: ImageUrl) {
    return this._value === url.value;
  }
}
