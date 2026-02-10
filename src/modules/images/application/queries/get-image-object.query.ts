import { IQuery } from '@nestjs/cqrs';

export class GetImageObjectQuery implements IQuery {
  constructor(public readonly imageId: string) {}
}
