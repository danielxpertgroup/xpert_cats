import { Test, TestingModule } from '@nestjs/testing';
import { BreedImagesController } from './breed_images.controller';
import { BreedImagesService } from './breed_images.service';

describe('BreedImagesController', () => {
  let controller: BreedImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreedImagesController],
      providers: [BreedImagesService],
    }).compile();

    controller = module.get<BreedImagesController>(BreedImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
