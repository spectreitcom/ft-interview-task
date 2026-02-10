import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class SharpService {
  async scale(
    imageBuffer: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    const image = sharp(imageBuffer, {
      failOn: 'error',
      limitInputPixels: 1000 * 1000,
    });
    return image
      .resize({
        width,
        height,
        fit: 'contain',
      })
      .toBuffer();
  }
}
