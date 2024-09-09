import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { Repository } from 'typeorm';
import { UserRoleEnum } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  private async findOneOrFail(id: number, relations = false): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id: id },
      relations: {
        movies: (relations === true ? true : false)
      },
      select: {
        movies: {
          id: true,
          title: true,
          releaseDate: true,
          posterUrl: true
        }
      }
    });
    if (!category) {
      throw new NotFoundException(`La categoría con el Id ${id} no existe`);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto, user_id: number, role: UserRoleEnum): Promise<Category> {
    if (role != UserRoleEnum.ADMIN) {
      throw new ForbiddenException('Usted no está autorizado para crear categorías');
    }

    const existsCategory = await this.categoriesRepository.exists({
      where: { 
        title: createCategoryDto.title
      }
    });
    if (existsCategory) {
      throw new ConflictException('El título ya está registrado');
    }
    return this.categoriesRepository.save({ ...createCategoryDto, createdBy: user_id });
  }

  async findAll(page = 1, limit = 10, relations = false): Promise<{ data: Category[]; total: number; page: number; limit: number }>  {
    const [data, total] = await this.categoriesRepository.findAndCount({
      skip: page > 0 ? (page - 1) * limit : 0,
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        movies: {
          id: true,
          title: true,
          releaseDate: true,
          posterUrl: true
        }
      },
      relations: {
        movies: relations ? true : false
      }
    });
  
    return {
      data,
      total,
      page,
      limit,
    };
  }

  findOne(id: number, relations: boolean): Promise<Category> {
    return this.findOneOrFail(id, relations);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, user_id: number, role: UserRoleEnum): Promise<Category> {
    if (role != UserRoleEnum.ADMIN) {
      throw new ForbiddenException('Usted no está autorizado para modificar categorías');
    }

    const category = await this.findOneOrFail(id);

    if (updateCategoryDto.title != null) {
      category.title = updateCategoryDto.title;
    }
    if (updateCategoryDto.description != null) {
      category.description = updateCategoryDto.description;
    }
    if (updateCategoryDto.enabled != null) {
      category.enabled = updateCategoryDto.enabled;
    }
    category.updatedBy = user_id;

    return this.categoriesRepository.save(category);
  }

  async remove(id: number, cascade: boolean, role: UserRoleEnum) {
    if (role != UserRoleEnum.ADMIN) {
      throw new ForbiddenException('Usted no está autorizado para eliminar categorías');
    }

    const category = await this.findOneOrFail(id);
    if (cascade) {
      await this.moviesRepository.delete({ category });
      return this.categoriesRepository.delete(id);
    } else {
      const countMovies = await this.moviesRepository.countBy({ categoryId: id });
      if (countMovies > 0) {
        throw new ConflictException({ message: `La categoría no se puede eliminar porque tiene ${countMovies} películas asociadas` })
      } else {
        return this.categoriesRepository.delete(id);
      }
    }
  }

  async findMovies(id: number): Promise<Movie[]> {
    const category = await this.findOneOrFail(id, true);
    return category.movies;
  }
}
