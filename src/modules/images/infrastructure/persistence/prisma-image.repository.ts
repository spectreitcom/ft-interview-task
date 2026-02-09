import { ImageRepository } from '../../application/ports/image.repository';
import { Injectable } from '@nestjs/common';
import { Image } from '../../domain/image';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { ImageStatus } from '@prisma/client';

@Injectable()
export class PrismaImageRepository implements ImageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(image: Image): Promise<void> {
    await this.prismaService.$transaction(async (prisma) => {
      await prisma.image.upsert({
        create: {
          id: image.getImageId().value,
          title: image.getTitle().value,
          objectKey: image.getObjectKey(),
          width: image.getImageSize().width,
          height: image.getImageSize().height,
        },
        where: {
          id: image.getImageId().value,
        },
        update: {
          status: image.getStatus().value as ImageStatus,
        },
      });

      if (image.hasProcessedImage) {
        await prisma.processedImage.create({
          data: {
            id: image.getProcessedImage()?.id ?? '',
            objectKey: image.getProcessedImage()?.objectKey ?? '',
            url: image.getProcessedImage()?.url ?? '',
            imageId: image.getImageId().value,
          },
        });
      }
    });
  }
}
