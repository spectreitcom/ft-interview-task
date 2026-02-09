import { ImageCreatedEventHandler } from './image-created.event-handler';
import { ImageProcessingFinishedEventHandler } from './image-processing-finished.event-handler';
import { ImageProcessingFailedEventHandler } from './image-processing-failed.event-handler';

export const eventHandlers = [
  ImageCreatedEventHandler,
  ImageProcessingFinishedEventHandler,
  ImageProcessingFailedEventHandler,
];
