import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBreedImageDto } from './dto/create-breed_image.dto';
import { UpdateBreedImageDto } from './dto/update-breed_image.dto';
import axios from 'axios';

@Injectable()
export class BreedImagesService {
  private readonly apiUrl = process.env.CAT_API_URL;
  private readonly apiKey = process.env.CAT_API_KEY;
  create(createBreedImageDto: CreateBreedImageDto) {
    return 'This action adds a new breedImage';
  }

  findAll() {
    return `This action returns all breedImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} breedImage`;
  }

  update(id: number, updateBreedImageDto: UpdateBreedImageDto) {
    return `This action updates a #${id} breedImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} breedImage`;
  }

  // Obtener imágenes de una raza específica
  async getImagesByBreed(breedId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.apiUrl}/images/search?breed_id=${breedId}&limit=5`,
        { headers: { 'x-api-key': this.apiKey } },
      );
      return response.data;
    } catch (error) {
      throw new HttpException('Error fetching images', HttpStatus.BAD_REQUEST);
    }
  }
}
