export abstract class ImageUploaderService {
  abstract upload(file: Express.Multer.File): Promise<string>;
  abstract getObjectFromStorage(storageKey: string): Promise<Buffer>;
  abstract overrideObject(
    storageKey: string,
    imageBuffer: Buffer,
  ): Promise<void>;
  abstract getObjectUrl(storageKey: string): string;
}
