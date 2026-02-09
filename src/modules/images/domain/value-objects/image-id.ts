import { IsUUID, validateSync } from 'class-validator';
import { randomUUID } from 'node:crypto';

export class ImageId {
  @IsUUID()
  private readonly _value: string;

  protected constructor(value: string) {
    this._value = value;
    this.validate();
  }

  private validate() {
    const result = validateSync(this);
    if (result.length > 0) {
      throw new Error('ImageId validation failed');
    }
  }

  get value() {
    return this._value;
  }

  static create() {
    return new ImageId(randomUUID());
  }

  static fromString(value: string) {
    return new ImageId(value);
  }

  equals(id: ImageId) {
    return this._value === id.value;
  }
}
