/* eslint-disable @typescript-eslint/unbound-method */
import { ImageRepository } from '../../ports/image.repository';
import { UploadImageCommandHandler } from '../upload-image.command-handler';
import { ImageUploaderService } from '../../ports/image-uploader.service';
import { ImageProcessingQueueService } from '../../ports/image-processing-queue.service';
import { EventPublisher } from '@nestjs/cqrs';
import { randomUUID } from 'node:crypto';
import { Logger } from '@nestjs/common';

const VALID_MIME_TYPE = 'image/jpeg';

describe('UploadImageCommandHandler', () => {
  let handler: UploadImageCommandHandler;
  let imageRepository: jest.Mocked<ImageRepository>;
  let imageUploaderService: jest.Mocked<ImageUploaderService>;
  let imageProcessingQueueService: jest.Mocked<ImageProcessingQueueService>;
  let eventPublisher: jest.Mocked<EventPublisher>;

  beforeEach(() => {
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});

    imageRepository = {
      save: jest.fn(),
    } as unknown as jest.Mocked<ImageRepository>;

    eventPublisher = {
      mergeObjectContext: jest.fn(),
    } as unknown as jest.Mocked<EventPublisher>;

    imageUploaderService = {
      upload: jest.fn(),
    } as unknown as jest.Mocked<ImageUploaderService>;

    imageProcessingQueueService = {
      enqueue: jest.fn(),
    };

    handler = new UploadImageCommandHandler(
      imageRepository,
      eventPublisher,
      imageUploaderService,
      imageProcessingQueueService,
    );
  });

  it('should save an image object and enqueue processing task', async () => {
    const mockFile = {
      mimetype: VALID_MIME_TYPE,
      buffer: Buffer.from('test'),
    } as Express.Multer.File;
    const mockStorageKey = 'test-storage-key';
    const mockImageId = randomUUID();

    imageUploaderService.upload.mockResolvedValue(mockStorageKey);

    const mockImage = {
      getImageId: jest.fn().mockReturnValue({ value: mockImageId }),
      commit: jest.fn(),
    };

    eventPublisher.mergeObjectContext.mockReturnValue(mockImage);

    const command = {
      file: mockFile,
      width: 500,
      height: 500,
      title: 'Test Image',
    };

    await handler.execute(command);

    expect(imageUploaderService.upload).toHaveBeenCalledWith(mockFile);
    expect(eventPublisher.mergeObjectContext).toHaveBeenCalled();
    expect(imageRepository.save).toHaveBeenCalled();
    expect(imageProcessingQueueService.enqueue).toHaveBeenCalledTimes(1);
    expect(imageProcessingQueueService.enqueue).toHaveBeenCalledWith(
      expect.any(String),
    );
  });

  it('should throw an error if image mime-type is incorrect ', async () => {
    const mockFile = {
      mimetype: 'application/pdf',
      buffer: Buffer.from('test'),
    } as Express.Multer.File;
    const command = {
      file: mockFile,
      width: 100,
      height: 100,
      title: 'Test Image',
    };

    imageUploaderService.upload.mockResolvedValue('test-key');

    await expect(handler.execute(command)).rejects.toThrow(
      'ImageMimeType validation failed',
    );
  });

  it('should throw an error if width exceeds 500', async () => {
    const mockFile = {
      mimetype: VALID_MIME_TYPE,
      buffer: Buffer.from('test'),
    } as Express.Multer.File;
    const command = {
      file: mockFile,
      width: 501,
      height: 100,
      title: 'Test Image',
    };

    imageUploaderService.upload.mockResolvedValue('test-key');

    await expect(handler.execute(command)).rejects.toThrow(
      'ImageSize validation failed',
    );
  });

  it('should throw an error if height exceeds 500', async () => {
    const mockFile = {
      mimetype: VALID_MIME_TYPE,
      buffer: Buffer.from('test'),
    } as Express.Multer.File;
    const command = {
      file: mockFile,
      width: 100,
      height: 501,
      title: 'Test Image',
    };

    imageUploaderService.upload.mockResolvedValue('test-key');

    await expect(handler.execute(command)).rejects.toThrow(
      'ImageSize validation failed',
    );
  });

  it('should throw an error if title is empty', async () => {
    const mockFile = {
      mimetype: VALID_MIME_TYPE,
      buffer: Buffer.from('test'),
    } as Express.Multer.File;
    const command = {
      file: mockFile,
      width: 100,
      height: 100,
      title: '',
    };

    imageUploaderService.upload.mockResolvedValue('test-key');

    await expect(handler.execute(command)).rejects.toThrow(
      'ImageTitle validation failed',
    );
  });

  it('should throw an error if title exceeds 120 characters', async () => {
    const mockFile = {
      mimetype: VALID_MIME_TYPE,
      buffer: Buffer.from('test'),
    } as Express.Multer.File;
    const command = {
      file: mockFile,
      width: 100,
      height: 100,
      title: 'a'.repeat(121),
    };

    imageUploaderService.upload.mockResolvedValue('test-key');

    await expect(handler.execute(command)).rejects.toThrow(
      'ImageTitle validation failed',
    );
  });

  it('should throw an error if image upload fails', async () => {
    const mockFile = {
      mimetype: VALID_MIME_TYPE,
      buffer: Buffer.from('test'),
    } as Express.Multer.File;

    const command = {
      file: mockFile,
      width: 100,
      height: 100,
      title: 'Test Image',
    };

    const uploadError = new Error('Upload failed');
    imageUploaderService.upload.mockRejectedValue(uploadError);

    await expect(handler.execute(command)).rejects.toThrow(uploadError);
  });
});
