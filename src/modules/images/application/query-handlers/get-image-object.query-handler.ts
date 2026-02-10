import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetImageObjectQuery } from '../queries/get-image-object.query';
import { ImageRead } from './types';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { AppError } from '../../../../shared/errors';

@QueryHandler(GetImageObjectQuery)
export class GetImageObjectQueryHandler implements IQueryHandler<
  GetImageObjectQuery,
  ImageRead
> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetImageObjectQuery): Promise<ImageRead> {
    const { imageId } = query;

    const imageRead = await this.prismaService.imageRead.findUnique({
      where: {
        imageId,
      },
    });

    if (!imageRead) {
      throw new AppError(
        'ENTITY_NOT_FOUND',
        `Image with id ${imageId} not found`,
      );
    }

    return imageRead;
  }
}
