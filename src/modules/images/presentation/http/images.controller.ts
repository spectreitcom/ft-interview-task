import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetImagesQuery } from '../../application/queries/get-images.query';
import { PaginatedData } from '../../../../shared/types';
import { ImageRead } from '../../application/query-handlers/types';
import { GetImageObjectQuery } from '../../application/queries/get-image-object.query';
import {
  ApiOperation,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GetImagesQueryParamsDto } from './dto/get-images-query-params.dto';
import {
  GetImageItemResponseDto,
  GetImagesResponseDto,
} from './dto/get-images-response.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post()
  async uploadImage() {}

  @ApiOperation({ summary: 'Returns the list of images' })
  @ApiOkResponse({
    type: GetImagesResponseDto,
  })
  @Get()
  async getImages(
    @Query() queryParamsDto: GetImagesQueryParamsDto,
  ): Promise<GetImagesResponseDto> {
    const query = new GetImagesQuery(queryParamsDto.page, queryParamsDto.title);
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
