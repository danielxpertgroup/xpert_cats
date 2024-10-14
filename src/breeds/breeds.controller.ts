import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';

@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto);
  }

  // @Get()
  // findAll() {
  //   return this.breedsService.findAll();
  // }

  @Get('search/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.breedsService.findOne(id);
  }

  @Get()
  getBreeds() {
    return this.breedsService.getBreeds();
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBreedDto: UpdateBreedDto,
  ) {
    return this.breedsService.update(id, updateBreedDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.breedsService.remove(id);
  }

  // Ruta para obtener todas las razas
  @Get()
  async getAllBreeds() {
    return this.breedsService.getBreeds();
  }
}
