import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Movie])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
