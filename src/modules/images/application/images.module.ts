import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { ImagesController } from '../presentation/http/images.controller';

@Module({
  imports: [InfrastructureModule],
  controllers: [ImagesController],
})
export class ImagesModule {}
