import { IsNotEmpty, IsString, MaxLength, validateSync } from 'class-validator';

export class ImageTitle {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
    this.validate();
  }

  private validate() {
    const result = validateSync(this);
    if (result.length > 0) {
      throw new Error('ImageTitle validation failed');
    }
  }

  get value() {
    return this._value;
  }

  static fromString(value: string) {
    return new ImageTitle(value);
  }

  equals(title: ImageTitle) {
    return this._value === title.value;
  }
}
