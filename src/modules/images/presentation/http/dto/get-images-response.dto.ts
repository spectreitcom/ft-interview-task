import { ApiProperty } from '@nestjs/swagger';

export class GetImageItemResponseDto {
  @ApiProperty({
    description: 'The image id',
    format: 'uuid',
  })
  readonly id: string;

  @ApiProperty({
    description: 'The image title',
    example: 'my image',
  })
  readonly title: string;

  @ApiProperty({
    description: 'The image url',
  })
  readonly url: string;

  @ApiProperty({
    description: 'The image width',
    example: 100,
  })
  readonly width: number;

  @ApiProperty({
    description: 'The image height',
    example: 100,
  })
  readonly height: number;
}

export class GetImagesResponseDto {
  @ApiProperty({
    description: 'The list of images',
    type: [GetImageItemResponseDto],
  })
  readonly data: GetImageItemResponseDto[];

  @ApiProperty({
    description: 'The total number of images',
    example: 100,
  })
  readonly total: number;
}
