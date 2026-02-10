import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetImagesQueryParamsDto {
  @ApiPropertyOptional({
    description: 'The page number to retrieve',
    example: 1,
    default: 1,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    description: 'The image title to filter by',
    example: 'my image',
  })
  @IsString()
  @IsOptional()
  readonly title?: string;
}
