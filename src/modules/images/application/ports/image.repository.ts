import { Image } from '../../domain/image';

export abstract class ImageRepository {
  abstract save(image: Image): Promise<void>;
  abstract findById(id: string): Promise<Image | null>;
}
