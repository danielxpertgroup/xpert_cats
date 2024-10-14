import { Test, TestingModule } from '@nestjs/testing';
import { BreedImagesService } from './breed_images.service';

describe('BreedImagesService', () => {
  let service: BreedImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreedImagesService],
    }).compile();

    service = module.get<BreedImagesService>(BreedImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
