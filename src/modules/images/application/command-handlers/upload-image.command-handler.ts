import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UploadImageCommand } from '../commands/upload-image.command';
import { ImageRepository } from '../ports/image.repository';
import { Image } from '../../domain/image';
import { ImageUploaderService } from '../ports/image-uploader.service';
import { Logger } from '@nestjs/common';
import { ImageProcessingQueueService } from '../ports/image-processing-queue.service';

@CommandHandler(UploadImageCommand)
export class UploadImageCommandHandler implements ICommandHandler<
  UploadImageCommand,
  void
> {
  private readonly logger = new Logger(UploadImageCommandHandler.name);

  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly imageUploaderService: ImageUploaderService,
    private readonly imageProcessingQueueService: ImageProcessingQueueService,
  ) {}

  async execute(command: UploadImageCommand): Promise<void> {
    const { file, width, height, title } = command;

    try {
      const storageKey = await this.imageUploaderService.upload(file);

      const image = Image.create({
        imgHeight: height,
        imgTitle: title,
        imgWidth: width,
        imgStorageKey: storageKey,
        imgMimeType: file.mimetype,
      });

      this.eventPublisher.mergeObjectContext(image);
      await this.imageRepository.save(image);
      image.commit();

      await this.imageProcessingQueueService.enqueue(image.getImageId().value);
    } catch (e) {
      this.logger.error('Failed to upload image', e);
      throw e;
    }
  }
}
