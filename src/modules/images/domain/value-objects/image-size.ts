import { IsNumber, IsPositive, validateSync } from 'class-validator';

export class ImageSize {
  @IsNumber()
  @IsPositive()
  private readonly _width: number;

  @IsNumber()
  @IsPositive()
  private readonly _height: number;

  private constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
    this.validate();
  }

  private validate() {
    const result = validateSync(this);
    if (result.length > 0) {
      throw new Error('ImageSize validation failed');
    }
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  static create(width: number, height: number) {
    return new ImageSize(width, height);
  }

  equals(size: ImageSize) {
    return this._width === size.width && this._height === size.height;
  }
}
