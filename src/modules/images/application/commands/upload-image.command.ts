import { ICommand } from '@nestjs/cqrs';

export class UploadImageCommand implements ICommand {
  constructor(
    public readonly file: Express.Multer.File,
    public readonly width: number,
    public readonly height: number,
    public readonly title: string,
  ) {}
}
