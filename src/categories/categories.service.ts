import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existsCategory = await this.categoriesRepository.exists({
      where: { 
        title: createCategoryDto.title
      }
    });
    if (existsCategory) {
      throw new ConflictException('El título ya está registrado');
    }
    const category = new Category();
    category.title = createCategoryDto.title;
    category.description = createCategoryDto.description;
    category.enabled = createCategoryDto.enabled;
    return this.categoriesRepository.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  findOne(id: number) {
    return this.categoriesRepository.findOneBy({ id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`La categoría con el Id ${id} no existe`);
    }

    category.title = updateCategoryDto.title;
    category.description = updateCategoryDto.description;

    return this.categoriesRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`La categoría con el Id ${id} no existe`);
    }

    await this.categoriesRepository.delete(category.id);
    return category;
  }
}
