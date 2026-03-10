import { PrismaService } from './prisma.service';
import { PageDto } from './page.dto';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class PageService {
  public currentPage = 1; // 默认第 1 页
  public pageSize = 10; // 默认每页 10 条
  constructor(private prisma: PrismaService) {}

  async paginate<T>(
    model: string,
    pageDto: PageDto,
    options: {
      where?: any;
      select?: any;
      orderBy?: any;
      include?: any;
    } = {},
    dtoClass?: new () => T,
  ) {

    const query: Record<string, any> = {
      where: options.where,
      orderBy: options.orderBy,
      skip: ((pageDto.currentPage ?? 1) - 1) * (pageDto.pageSize ?? 10),
      take: pageDto.pageSize,
    }; 
    if (options.include) {
      query.include = options.include;
    }
    if (options.select) {
      query.select = options.select;
    }

    const data = await this.prisma[model].findMany(query);
    const total = await this.prisma[model].count({
      where: options.where,
    });

    const transformedData = dtoClass ? plainToClass(dtoClass, data) : data;

    return {
      list: transformedData,
      total: total,
      currentPage: pageDto.currentPage,
      pageSize: pageDto.pageSize,
    };
  }
}