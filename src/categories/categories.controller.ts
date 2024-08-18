import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, Res, ParseBoolPipe, DefaultValuePipe } from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean
  ) {
    console.log(relations)
    return this.categoriesService.findAll(page, limit, relations);
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean
  ) {
    return this.categoriesService.findOne(id, relations);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id') id: number,
    @Query('cascade', new DefaultValuePipe(false), ParseBoolPipe) cascade: boolean,
    @Res() response: Response
  ) {
    await this.categoriesService.remove(id, cascade);
    response.sendStatus(204);
  }

  @Get(':id/movies')
  findMovies(@Param('id') id: number) {
    return this.categoriesService.findMovies(id);
  }
}
