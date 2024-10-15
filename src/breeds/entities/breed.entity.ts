import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Breed extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  origin?: string;
  life_span?: string;
  temperament?: string;
  createdAT: number;
  updatedAt?: number;
}

export const BreedSchema = SchemaFactory.createForClass(Breed);
