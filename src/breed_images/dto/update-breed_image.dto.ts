import { PartialType } from '@nestjs/mapped-types';
import { CreateBreedImageDto } from './create-breed_image.dto';

export class UpdateBreedImageDto extends PartialType(CreateBreedImageDto) {}
