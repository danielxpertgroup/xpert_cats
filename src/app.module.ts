import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BreedsModule } from './breeds/breeds.module';
import { BreedImagesModule } from './breed_images/breed_images.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { BreedsService } from './breeds/breeds.service';
import { BreedImagesService } from './breed_images/breed_images.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BreedsModule,
    BreedImagesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BreedsService,
    UsersService,
    BreedImagesService,
    UsersService,
  ],
})
export class AppModule {}
