import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { Breed, BreedSchema } from './entities/breed.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Breed.name,
        schema: BreedSchema,
      },
    ]),
  ],
  controllers: [BreedsController],
  providers: [BreedsService],
  exports: [BreedsService],
})
export class BreedsModule {}
