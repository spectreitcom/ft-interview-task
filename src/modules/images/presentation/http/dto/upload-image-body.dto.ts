import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadImageBodyDto {
  @ApiProperty({
    description: 'The image width',
    example: 100,
  })
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Max(500)
  readonly width: number;

  @ApiProperty({
    description: 'The image height',
    example: 100,
  })
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Max(500)
  readonly height: number;

  @ApiProperty({
    description: 'The image title',
    example: 'my image',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'The image file',
    format: 'binary',
  })
  readonly file: any;
}
