import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from '../images.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetImagesQuery } from '../../../application/queries/get-images.query';
import { GetImageObjectQuery } from '../../../application/queries/get-image-object.query';
import { GetImagesQueryParamsDto } from '../dto/get-images-query-params.dto';
import { UploadImageBodyDto } from '../dto/upload-image-body.dto';
import { ImageRead } from '../../../application/query-handlers/types';
import { PaginatedData } from '../../../../../shared/types';
import { randomUUID } from 'node:crypto';
import { PROCESSING_STATUS } from '../../../domain/value-objects/image-status';

const createMockQueryBus = () => ({
  execute: jest.fn(),
});

const createMockCommandBus = () => ({
  execute: jest.fn(),
});

describe('ImagesController', () => {
  let controller: ImagesController;
  let queryBus: ReturnType<typeof createMockQueryBus>;
  let commandBus: ReturnType<typeof createMockCommandBus>;

  beforeEach(async () => {
    queryBus = createMockQueryBus();
    commandBus = createMockCommandBus();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        { provide: QueryBus, useValue: queryBus },
        { provide: CommandBus, useValue: commandBus },
      ],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
  });

  describe('uploadImage', () => {
    it('should call CommandBus.execute with UploadImageCommand and correct data', async () => {
      // arrange
      const file = {
        originalname: 'photo.jpg',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('file-bytes'),
        size: 123,
      } as unknown as Express.Multer.File;

      const body: UploadImageBodyDto = {
        width: 120,
        height: 80,
        title: 'my image',
        file: 'nothing',
      };

      const imageId = randomUUID();
      commandBus.execute.mockResolvedValue(imageId);

      // act
      const result = await controller.uploadImage(file, body);

      // assert
      expect(commandBus.execute).toHaveBeenCalledTimes(1);
      expect(commandBus.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          file,
          width: body.width,
          height: body.height,
          title: body.title,
        }),
      );
      expect(result).toEqual({ id: imageId, status: PROCESSING_STATUS });
    });
  });

  describe('getImages', () => {
    it('should return mapped data and total, and call QueryBus.execute with GetImagesQuery', async () => {
      // arrange
      const queryParams: GetImagesQueryParamsDto = {
        page: 2,
        pageSize: 5,
        title: 'cat',
      };

      const images: PaginatedData<ImageRead> = {
        data: [
          {
            id: randomUUID(),
            imageId: randomUUID(),
            title: 'Cat 1',
            width: 640,
            height: 480,
            url: 'https://cdn/img1.jpg',
          },
          {
            id: randomUUID(),
            imageId: randomUUID(),
            title: 'Cat 2',
            width: 800,
            height: 600,
            url: 'https://cdn/img2.jpg',
          },
        ],
        total: 42,
      };

      queryBus.execute.mockResolvedValue(images);

      // act
      const res = await controller.getImages(queryParams);

      // assert
      expect(queryBus.execute).toHaveBeenCalledTimes(1);
      expect(queryBus.execute).toHaveBeenCalledWith(
        new GetImagesQuery(
          queryParams.page,
          queryParams.pageSize,
          queryParams.title,
        ),
      );
      expect(res).toEqual({
        data: images.data.map((i) => ({
          id: i.imageId,
          url: i.url,
          title: i.title,
          width: i.width,
          height: i.height,
        })),
        total: images.total,
      });
    });
  });

  describe('getImage', () => {
    it('should return a single object in the expected format and call QueryBus.execute with GetImageObjectQuery', async () => {
      // arrange
      const id = randomUUID();
      const image: ImageRead = {
        id: randomUUID(),
        imageId: id,
        title: 'Single',
        width: 100,
        height: 200,
        url: 'https://cdn/img3.jpg',
      };

      queryBus.execute.mockResolvedValue(image);

      // act
      const res = await controller.getImage(id);

      // assert
      expect(queryBus.execute).toHaveBeenCalledTimes(1);
      expect(queryBus.execute).toHaveBeenCalledWith(
        expect.any(GetImageObjectQuery),
      );
      expect(res).toEqual({
        id: image.imageId,
        url: image.url,
        title: image.title,
        width: image.width,
        height: image.height,
      });
    });
  });
});
