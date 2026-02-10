import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetImagesQuery } from '../../application/queries/get-images.query';
import { PaginatedData } from '../../../../shared/types';
import { ImageRead } from '../../application/query-handlers/types';
import { GetImageObjectQuery } from '../../application/queries/get-image-object.query';
import {
  ApiOperation,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiConsumes,
  ApiAcceptedResponse,
} from '@nestjs/swagger';
import { GetImagesQueryParamsDto } from './dto/get-images-query-params.dto';
import {
  GetImageItemResponseDto,
  GetImagesResponseDto,
} from './dto/get-images-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageCommand } from '../../application/commands/upload-image.command';
import { UploadImageBodyDto } from './dto/upload-image-body.dto';
import { allowedMimeTypeRegex } from '../../shared/utils';
import { PROCESSING_STATUS } from '../../domain/value-objects/image-status';

@Controller('images')
export class ImagesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Uploads an image' })
  @ApiAcceptedResponse({
    description: 'The image has been uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        status: { type: 'string', default: PROCESSING_STATUS },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload',
  })
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
          new FileTypeValidator({
            fileType: allowedMimeTypeRegex,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: UploadImageBodyDto,
  ) {
    const command = new UploadImageCommand(
      file,
      body.width,
      body.height,
      body.title,
    );
    const imageId = await this.commandBus.execute<UploadImageCommand, void>(
      command,
    );

    return { id: imageId, status: PROCESSING_STATUS };
  }

  @ApiOperation({ summary: 'Returns the list of images' })
  @ApiOkResponse({
    type: GetImagesResponseDto,
  })
  @Get()
  async getImages(
    @Query() queryParamsDto: GetImagesQueryParamsDto,
  ): Promise<GetImagesResponseDto> {
    const query = new GetImagesQuery(
      queryParamsDto.page,
      queryParamsDto.pageSize,
      queryParamsDto.title,
    );
    const result = await this.queryBus.execute<
      GetImagesQuery,
      PaginatedData<ImageRead>
    >(query);

    const transformedData = result.data.map((image) => ({
      id: image.imageId,
      url: image.url,
      title: image.title,
      width: image.width,
      height: image.height,
    }));

    return {
      data: transformedData,
      total: result.total,
    };
  }

  @ApiOperation({ summary: 'Returns the image object' })
  @ApiOkResponse({
    type: GetImageItemResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Image not found',
  })
  @Get(':id')
  async getImage(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<GetImageItemResponseDto> {
    const query = new GetImageObjectQuery(id);
    const result = await this.queryBus.execute<GetImageObjectQuery, ImageRead>(
      query,
    );

    return {
      id: result.imageId,
      url: result.url,
      title: result.title,
      width: result.width,
      height: result.height,
    };
  }
}
