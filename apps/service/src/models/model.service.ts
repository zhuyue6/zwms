import { PageService } from './page.service';
import { PageDto } from './page.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { plainToClass } from 'class-transformer'
import { NotFoundException, AlreadyExistsException } from '../common/errors';

interface FindOptions {
  where?: any;
  orderBy?: any;
  select?: any;
  include?: any;
}

export type{ PageDto }

@Injectable()
export class ModelService {
  constructor(
    private pageService: PageService,
    private prismaService: PrismaService
  ) {}

  async paginate<T>(model: string, pageDto: PageDto, options?: FindOptions, dtoClass?: new () => T) {
    return this.pageService.paginate(model, pageDto, options, dtoClass)
  }

  async findOne<T>(model: string, where: FindOptions['where'], dtoClass?: new () => T) {
    const data = await this.prismaService[model].findFirst({
      where
    })
    const transformedData = dtoClass ? plainToClass(dtoClass, data) : data;
    return transformedData
  }

  async findAll<T>(model: string, options?: FindOptions, dtoClass?: new () => T) {
    const data = await this.prismaService[model].findMany(options)
    let formatList = data
    if (dtoClass) {
      formatList = data.map((item) => plainToClass(dtoClass, item))
    }
    return formatList
  }

  async create(model: string, data: any, where?: FindOptions['where'], errorMessage?: string) {
    if (where) {
      const item = await this.findOne(model, where);
      if (item) {
        throw new AlreadyExistsException(errorMessage ?? '该数据已存在')
      }
    }
    await this.prismaService[model].create({
      data,
    });
  }
  async update(model: string, where: FindOptions['where'], data: any, errorMessage?: string) {
    const item = await this.findOne(model, where);
    if (!item) {
      throw new NotFoundException(errorMessage ?? '该数据不存在')
    }
    await this.prismaService[model].update({
      where,
      data,
    });
  }
  async delete(model: string, where: FindOptions['where'], errorMessage?: string) {
    const item = await this.findOne(model, where);
    if (!item) {
      throw new NotFoundException(errorMessage ?? '该数据不存在')
    }
    await this.prismaService[model].delete({
      where,
    });
  }
}