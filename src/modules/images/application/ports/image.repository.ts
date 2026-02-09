import { Image } from '../../domain/image';

export abstract class ImageRepository {
  abstract save(image: Image): Promise<void>;
}
