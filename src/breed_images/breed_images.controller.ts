import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BreedImagesService } from './breed_images.service';
import { CreateBreedImageDto } from './dto/create-breed_image.dto';
import { UpdateBreedImageDto } from './dto/update-breed_image.dto';

@Controller('breed-images')
export class BreedImagesController {
  constructor(private readonly breedImagesService: BreedImagesService) {}

  @Post()
  create(@Body() createBreedImageDto: CreateBreedImageDto) {
    return this.breedImagesService.create(createBreedImageDto);
  }

  @Get()
  findAll() {
    return this.breedImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breedImagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBreedImageDto: UpdateBreedImageDto,
  ) {
    return this.breedImagesService.update(+id, updateBreedImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breedImagesService.remove(+id);
  }

  // Ruta para obtener imágenes por ID de raza
  @Get('imagesbybreedid/:id')
  async getImagesByBreed(@Param('id') id: string) {
    return this.breedImagesService.getImagesByBreed(id);
  }
}
