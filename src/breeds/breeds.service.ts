import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { Breed } from './entities/breed.entity';

@Injectable()
export class BreedsService {
  private breeds: Breed[] = [];
  private readonly apiUrl = process.env.CAT_API_URL;
  private readonly apiKey = process.env.CAT_API_KEY;
  create(createBreedDto: CreateBreedDto) {
    const { name } = createBreedDto;

    const breed: Breed = {
      breed_id: uuid(),
      name: name.toLowerCase(),
      origin: '',
      life_span: '',
      temperament: '',
      createdAT: new Date().getTime(),
    };

    this.breeds.push(breed);

    return breed;
  }

  findAll() {
    return this.breeds;
  }

  findOne(id: string) {
    const breed = this.breeds.find((breed) => breed.breed_id === id);
    if (!breed) throw new NotFoundException(`breed with id "${id}" not found`);

    return breed;
  }

  update(id: string, updateBreedDto: UpdateBreedDto) {
    let breedDB = this.findOne(id);

    this.breeds = this.breeds.map((brand) => {
      if (brand.breed_id === id) {
        breedDB.updatedAt = new Date().getTime();
        breedDB = { ...breedDB, ...updateBreedDto };
        return breedDB;
      }
      return brand;
    });

    return breedDB;
  }

  remove(id: string) {
    this.breeds = this.breeds.filter((breed) => breed.breed_id !== id);
  }

  // Obtener razas de gatos
  async getBreeds(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/breeds?&limit=5`, {
        headers: { 'x-api-key': this.apiKey },
      });
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error fetching cat breeds',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
