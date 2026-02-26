import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from '../modules/prisma.service';
import { 
  type CreateArticleTagDto, 
  ArticleTagDto, 
  UpdateArticleTagDto, 
  DeleteArticleTagDto,
  CreateArticleCategoryDto,
  UpdateArticleCategoryDto,
  DeleteArticleCategoryDto,
  ArticleCategoryDto
 } from './article.dto';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer'

@Injectable()
export class ArticleService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    @Inject(REQUEST) private readonly req: Request,
  ) {}
  async createTag(createArticleTagDto: CreateArticleTagDto) {
    // 1. 查询tag是否存在
    const tag = await this.prisma.articleTag.findFirst({
      where: { tagName: createArticleTagDto.tagName },
    });
    if (tag) {
      return {
        message: '已经存在该名称的tag',
      }
    }
    await this.prisma.articleTag.create({
      data: {
        tagName: createArticleTagDto.tagName,
      }
    })
  }
  async updateTag(updateArticleTagDto: UpdateArticleTagDto) {
    // 1. 查询tag是否存在
    const tag = await this.prisma.articleTag.findFirst({
      where: { id: updateArticleTagDto.id },
    });
    if (tag) {
      await this.prisma.articleTag.update({
        where: { id: updateArticleTagDto.id },
        data: {
          tagName: updateArticleTagDto.tagName
        }
      });
    }
  }
  async deleteTag(deleteArticleTagDto: DeleteArticleTagDto) {
    // 1. 查询tag是否存在
    const tag = await this.prisma.articleTag.findFirst({
      where: { id: deleteArticleTagDto.id },
    });
    if (tag) {
      await this.prisma.articleTag.delete({
        where: { id: deleteArticleTagDto.id },
      });
    }
  }
  async getTagList() {
    const list = await this.prisma.articleTag.findMany();
    const formatList = list.map((item)=>{
      return plainToClass(ArticleTagDto, item);
    })
    return {
      list: formatList,
    };
  }
  async createCategory(createArticleCategoryDto: CreateArticleCategoryDto) {
    const category = await this.prisma.articleCategory.findFirst({
      where: { categoryName: createArticleCategoryDto.categoryName },
    });
    if (category) {
      return {
        message: '已经存在该名称的category',
      }
    }
    await this.prisma.articleCategory.create({
      data: {
        categoryName: createArticleCategoryDto.categoryName,
      }
    })
  }
  async updateCategory(updateArticleCategoryDto: UpdateArticleCategoryDto) {
    const category = await this.prisma.articleCategory.findFirst({
      where: { id: updateArticleCategoryDto.id },
    });
    if (category) {
      await this.prisma.articleCategory.update({
        where: { id: updateArticleCategoryDto.id },
        data: {
          categoryName: updateArticleCategoryDto.categoryName
        }
      });
    }
  }
  async deleteCategory(deleteArticleCategoryDto: DeleteArticleCategoryDto) {
    const category = await this.prisma.articleCategory.findFirst({
      where: { id: deleteArticleCategoryDto.id },
    });
    if (category) {
      await this.prisma.articleCategory.delete({
        where: { id: deleteArticleCategoryDto.id },
      });
    }
  }
  async getCategoryList() {
    const list = await this.prisma.articleCategory.findMany();
    const formatList = list.map((item)=>{
      return plainToClass(ArticleCategoryDto, item);
    })
    return {
      list: formatList,
    };
  }
}
