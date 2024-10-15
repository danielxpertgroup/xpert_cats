import { Test, TestingModule } from '@nestjs/testing';
import { BreedsService } from './breeds.service';
import axios from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { Breed } from './entities/breed.entity';

describe('BreedsService', () => {
  let service: BreedsService;
  let mockBreedModel: jest.Mocked<Model<Breed>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreedsService],
    }).compile();

    service = module.get<BreedsService>(BreedsService);
    mockBreedModel = {
      find: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<Model<Breed>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Successfully fetches a list of cat breeds from the API
  it('should return a list of cat breeds when the API call is successful', async () => {
    const mockResponse = { data: [{ name: 'Breed1' }, { name: 'Breed2' }] };
    jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);
    const service = new BreedsService(mockBreedModel);
    const result = await service.getBreeds();
    expect(result).toEqual(mockResponse.data);
  });

  // Handles network errors during the API call
  it('should throw an HttpException with BAD_REQUEST status when there is a network error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Network Error'));
    const service = new BreedsService(mockBreedModel);
    await expect(service.getBreeds()).rejects.toThrow(HttpException);
    await expect(service.getBreeds()).rejects.toThrow(
      'Error fetching cat breeds',
    );
    await expect(service.getBreeds()).rejects.toHaveProperty(
      'status',
      HttpStatus.BAD_REQUEST,
    );
  });
});
