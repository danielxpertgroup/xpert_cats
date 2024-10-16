import { Module } from '@nestjs/common';
import { BreedsModule } from './breeds/breeds.module';
import { BreedImagesModule } from './breed_images/breed_images.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    BreedsModule,
    BreedImagesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
