import { Module } from '@nestjs/common';
import { BreedImagesService } from './breed_images.service';
import { BreedImagesController } from './breed_images.controller';

@Module({
  controllers: [BreedImagesController],
  providers: [BreedImagesService],
})
export class BreedImagesModule {}
