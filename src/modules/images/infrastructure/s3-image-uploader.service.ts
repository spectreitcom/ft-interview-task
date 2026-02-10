import { Injectable } from '@nestjs/common';
import { ImageUploaderService } from '../application/ports/image-uploader.service';

@Injectable()
export class S3ImageUploaderService implements ImageUploaderService {
  async upload(file: Express.Multer.File): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
