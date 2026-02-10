import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
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
  readonly width: number;

  @ApiProperty({
    description: 'The image height',
    example: 100,
  })
  @IsNumber()
  @IsPositive()
  @IsInt()
  readonly height: number;

  @ApiProperty({
    description: 'The image title',
    example: 'my image',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}
