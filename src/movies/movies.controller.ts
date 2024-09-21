import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, Request, Res, DefaultValuePipe, ParseBoolPipe } from '@nestjs/common';
import { Response } from 'express';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('v1/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto, @Request() request) {
    return this.moviesService.create(createMovieDto, request.user.sub, request.user.role);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean,
  ) {
    return this.moviesService.findAll(page, limit, relations);
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean,
  ) {
    return this.moviesService.findOne(id, relations);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto, @Request() request) {
    return this.moviesService.update(+id, updateMovieDto, request.user.sub, request.user.role);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number, @Res() response: Response, @Request() request) {
    await this.moviesService.remove(id, request.user.role);
    response.sendStatus(204);
  }

  @Get(':id/category')
  findCategory(@Param('id') id: number) {
    return this.moviesService.findCategory(id);
  }
}
