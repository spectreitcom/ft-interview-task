import { ImageRepository } from '../../application/ports/image.repository';
import { Injectable } from '@nestjs/common';
import { Image } from '../../domain/image';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { ImageStatus } from '@prisma/client';
import { ImageId } from '../../domain/value-objects/image-id';
import { ImageSize } from '../../domain/value-objects/image-size';
import { ImageTitle } from '../../domain/value-objects/image-title';
import { ImageMimeType } from '../../domain/value-objects/image-mime-type';

@Injectable()
export class PrismaImageRepository implements ImageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(image: Image): Promise<void> {
    await this.prismaService.image.upsert({
      create: {
        id: image.getImageId().value,
        title: image.getTitle().value,
        storageKey: image.getStorageKey(),
        width: image.getImageSize().width,
        height: image.getImageSize().height,
        mimeType: image.getMimeType().value,
      },
      where: {
        id: image.getImageId().value,
      },
      update: {
        status: image.getStatus().value as ImageStatus,
      },
    });
  }

  async findById(id: string): Promise<Image | null> {
    const record = await this.prismaService.image.findUnique({
      where: { id },
    });

    if (!record) return null;

    return new Image(
      ImageId.fromString(record.id),
      ImageSize.create(record.width, record.height),
      record.storageKey,
      ImageTitle.fromString(record.title),
      ImageMimeType.fromString(record.mimeType),
    );
  }
}
