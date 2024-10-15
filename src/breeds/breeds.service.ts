import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import axios from 'axios';
import { Breed } from './entities/breed.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class BreedsService {
  private breeds: Breed[] = [];
  private readonly apiUrl = process.env.CAT_API_URL;
  private readonly apiKey = process.env.CAT_API_KEY;

  constructor(
    @InjectModel(Breed.name)
    private readonly breedModel: Model<Breed>,
  ) {
    console.log('BreedModel Injected:', !!breedModel);
  }
  async create(createBreedDto: CreateBreedDto) {
    createBreedDto.name = createBreedDto.name.toLocaleLowerCase();

    try {
      const breed = await this.breedModel.create(createBreedDto);
      return breed;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return this.breeds;
  }

  async findOne(term: string) {
    let breed: Breed;

    if (!isNaN(+term)) {
      breed = await this.breedModel.findOne({ no: term });
    }

    // MongoID
    if (!breed && isValidObjectId(term)) {
      breed = await this.breedModel.findById(term);
    }

    // Name
    if (!breed) {
      breed = await this.breedModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!breed)
      throw new NotFoundException(
        `Breed with id, name or no "${term}" not found`,
      );

    return breed;
  }

  async update(term: string, updateBreedDto: UpdateBreedDto) {
    const breed = await this.findOne(term);

    if (updateBreedDto.name)
      updateBreedDto.name = updateBreedDto.name.toLowerCase();

    try {
      await breed.updateOne(updateBreedDto);
      return { ...breed.toJSON(), ...updateBreedDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.breedModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Breed with id "${id}" not found`);
    return;
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
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Breed exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Breed - Check server logs`,
    );
  }
}
