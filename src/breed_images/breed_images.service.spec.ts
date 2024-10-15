import { Test, TestingModule } from '@nestjs/testing';
import { BreedImagesService } from './breed_images.service';
import axios from 'axios';

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

  // Successfully fetch images for a valid breed ID
  it('should return images when given a valid breed ID', async () => {
    const breedId = 'validBreedId';
    const mockResponse = {
      data: [
        { id: '1', url: 'image1.jpg' },
        { id: '2', url: 'image2.jpg' },
      ],
    };
    jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);

    const service = new BreedImagesService();
    const result = await service.getImagesByBreed(breedId);

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.CAT_API_URL}/images/search?breed_id=${breedId}&limit=5`,
      { headers: { 'x-api-key': process.env.CAT_API_KEY } },
    );
  });

  // Handle invalid or non-existent breed ID gracefully
  it('should throw an error when given an invalid breed ID', async () => {
    const breedId = 'invalidBreedId';
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Request failed'));

    await expect(service.getImagesByBreed(breedId)).rejects.toThrow(
      'Error fetching images',
    );

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.CAT_API_URL}/images/search?breed_id=${breedId}&limit=5`,
      { headers: { 'x-api-key': process.env.CAT_API_KEY } },
    );
  });
});
