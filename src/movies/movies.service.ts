import { ConflictException, Injectable, NotFoundException, Res } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  private async findOneOrFail(id: number, relations = false): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({
      where: { id: id },
      relations: {
        category: relations ? true : false
      },
      select: {
        category: {
          id: true,
          title: true
        }
      }
    });
    if (!movie) {
      console.log(movie)
      throw new NotFoundException(`La película con el Id ${id} no existe`);
    }
    return movie;
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const existsMovie = await this.moviesRepository.exists({
      where: { 
        title: createMovieDto.title
      }
    });
    if (existsMovie) {
      throw new ConflictException('El título ya está registrado');
    }
    const existsCategory = await this.categoriesRepository.exists({
      where: { 
        id: createMovieDto.categoryId
      }
    });
    if (!existsCategory) {
      throw new ConflictException('La categoría no existe');
    }
    return this.moviesRepository.save({ ...createMovieDto });
  }

  async findAll(page = 1, limit = 10, relations = false): Promise<{ data: Movie[]; total: number; page: number; limit: number }>  {
    const [data, total] = await this.moviesRepository.findAndCount({
      skip: page > 0 ? (page - 1) * limit : 0,
      take: limit,
      select: {
        id: true,
        title: true,
        director: true,
        releaseDate: true,
        posterUrl: true,
        category: {
          id: true,
          title: true,
        }
      },
      relations: {
        category: relations ? true : false
      }
    });
  
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number, relations: boolean): Promise<Movie> {
    return this.findOneOrFail(id, relations);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOneOrFail(id);

    if (updateMovieDto.title != null) {
      movie.title = updateMovieDto.title;
    }
    if (updateMovieDto.synopsis != null) {
      movie.synopsis = updateMovieDto.synopsis;
    }
    if (updateMovieDto.director != null) {
      movie.director = updateMovieDto.director;
    }
    if (updateMovieDto.releaseDate != null) {
      movie.releaseDate = updateMovieDto.releaseDate;
    }
    if (updateMovieDto.posterUrl != null) {
      movie.posterUrl = updateMovieDto.posterUrl;
    }
    if (updateMovieDto.rating != null) {
      movie.rating = updateMovieDto.rating;
    }
    if (updateMovieDto.categoryId != null) {
      const existsCategory = await this.categoriesRepository.exists({
        where: { 
          id: updateMovieDto.categoryId
        }
      });
      if (!existsCategory) {
        throw new ConflictException('La categoría no existe');
      }
      movie.categoryId = updateMovieDto.categoryId;
    }

    return this.moviesRepository.save(movie);
  }

  async remove(id: number) {
    const movie = await this.findOneOrFail(id);

    return this.moviesRepository.delete(id);
  }

  async findCategory(id: number): Promise<Category> {
    const movie = await this.findOneOrFail(id, true);
    return movie.category;
  }
}
