import { IQuery } from '@nestjs/cqrs';

export class GetImagesQuery implements IQuery {
  constructor(
    public readonly page: number,
    public readonly title?: string,
  ) {}
}
