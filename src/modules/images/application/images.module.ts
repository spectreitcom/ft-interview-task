import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { ImagesController } from '../presentation/http/images.controller';
import { eventHandlers } from './event-handlers';
import { PrismaModule } from '../../../shared/prisma/prisma.module';
import { queryHandlers } from './query-handlers';
import { commandHandlers } from './command-handlers';

@Module({
  imports: [InfrastructureModule, PrismaModule],
  controllers: [ImagesController],
  providers: [...eventHandlers, ...queryHandlers, ...commandHandlers],
})
export class ImagesModule {}
