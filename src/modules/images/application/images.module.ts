import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { ImagesController } from '../presentation/http/images.controller';
import { eventHandlers } from './event-handlers';
import { PrismaModule } from '../../../shared/prisma/prisma.module';

@Module({
  imports: [InfrastructureModule, PrismaModule],
  controllers: [ImagesController],
  providers: [...eventHandlers],
})
export class ImagesModule {}
