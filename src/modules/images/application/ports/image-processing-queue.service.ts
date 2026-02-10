export abstract class ImageProcessingQueueService {
  abstract enqueue(imageId: string): Promise<void>;
}
