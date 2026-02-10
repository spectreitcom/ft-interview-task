import { Injectable } from '@nestjs/common';
import { ImageUploaderService } from '../application/ports/image-uploader.service';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { extname } from 'node:path';
import { randomUUID } from 'node:crypto';

@Injectable()
export class S3ImageUploaderService implements ImageUploaderService {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY')!,
      },
    });

    this.bucket = configService.get<string>('AWS_BUCKET')!;
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const key = `images/${randomUUID()}${extname(file.originalname)}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    await this.s3Client.send(command);

    return key;
  }
}
