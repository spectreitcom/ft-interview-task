export abstract class ImageUploaderService {
  abstract upload(file: Express.Multer.File): Promise<string>;
}
