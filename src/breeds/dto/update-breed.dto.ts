import { PartialType } from '@nestjs/mapped-types';
import { CreateBreedDto } from './create-breed.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateBreedDto extends PartialType(CreateBreedDto) {
  @IsString()
  @MinLength(1)
  readonly name: string;
  @IsString()
  @MinLength(1)
  readonly origin: string;
  @IsString()
  readonly life_span: string;
  @IsString()
  @MinLength(1)
  readonly personality: string;
}
