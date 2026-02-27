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
  ArticleCategoryDto,
  CreateArticleDto,
  UpdateArticleDto,
  DeleteArticleDto,
  ArticleDto
 } from './article.dto';
import { plainToClass } from 'class-transformer'

@Injectable()
export class ArticleService {
  constructor(
    private prisma: PrismaService,
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
  async createArticle(createArticleDto: CreateArticleDto) {
    const userId = (this.req as any).user?.userId;
    await this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        tagId: createArticleDto.tagId,
        categoryId: createArticleDto.categoryId,
        createBy: userId
      }
    })
  }
  async updateArticle(updateArticleDto: UpdateArticleDto) {
    const category = await this.prisma.article.findFirst({
      where: { id: updateArticleDto.id },
    });
    if (category) {
      await this.prisma.article.update({
        where: { 
          id: updateArticleDto.id
        },
        data: {
          tagId: updateArticleDto.tagId,
          categoryId: updateArticleDto.categoryId,
          title: updateArticleDto.title
        }
      });
    }
  }
  async deleteArticle(deleteArticleDto: DeleteArticleDto) {
    const article = await this.prisma.article.findFirst({
      where: { id: deleteArticleDto.id },
    });
    if (article) {
      await this.prisma.article.delete({
        where: { id: deleteArticleDto.id },
      });
    }
  }
  async getArticleList() {
    const list = await this.prisma.article.findMany({
      orderBy: [
        { updateTime: 'desc' }
      ],
      // 只返回前端需要的字段（避免冗余）
      select: {
        id: true,
        title: true,
        summary: true,
        viewCount: true,
        createTime: true,
        updateTime: true,
        categoryId: true,
        tagId: true,
        // 关联查询分类（一对多）
        category: {
          select: {
            categoryName: true // 只取分类名称
          }
        },
        // 关联查询标签（多对多：文章→中间表→标签）
        tags: {
          select: {
            tagName: true // 只取标签名称
          }
        },
        creator: {
          select: {
            name: true
          }
        }
      },
      // 只查已发布的文章
      where: {
        status: 1
      }
    });
    const formatList = list.map((item)=>{
      const article: object = { 
        ...item, 
        categoryName: item.category.categoryName,
        tagName: item.tags.tagName,
        creatorName: item.creator.name
      }
      Reflect.deleteProperty(article, 'category')
      Reflect.deleteProperty(article, 'tags')
      Reflect.deleteProperty(article, 'creator')
      return plainToClass(
        ArticleDto, 
        article
      );
    })
    return {
      list: formatList,
    };
  }
}
