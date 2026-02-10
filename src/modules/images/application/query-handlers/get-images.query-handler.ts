import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetImagesQuery } from '../queries/get-images.query';
import { PaginatedData } from '../../../../shared/types';
import { ImageRead } from './types';
import { PrismaService } from '../../../../shared/prisma/prisma.service';

@QueryHandler(GetImagesQuery)
export class GetImagesQueryHandler implements IQueryHandler<
  GetImagesQuery,
  PaginatedData<ImageRead>
> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetImagesQuery): Promise<PaginatedData<ImageRead>> {
    const { page, pageSize, title } = query;

    const data = await this.prismaService.imageRead.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const total = await this.prismaService.imageRead.count({
      where: {
        title: {
          contains: title,
        },
      },
    });

    return {
      data,
      total,
    };
  }
}
