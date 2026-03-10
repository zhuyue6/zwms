import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ModelService, PageDto } from '../models/model.service';
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
  GetArticleDto,
  ArticleDto
 } from './article.dto';
 import { plainToClass } from 'class-transformer'

@Injectable()
export class ArticleService {
  constructor(
    private modelService: ModelService,
    @Inject(REQUEST) private readonly req: Request,
  ) {}
  async createTag(createArticleTagDto: CreateArticleTagDto) {
    await this.modelService.create('articleTag',  createArticleTagDto, { tagName: createArticleTagDto.tagName }, '已经存在该名称的tag');
  }
  async updateTag(updateArticleTagDto: UpdateArticleTagDto) {
    await this.modelService.update('articleTag', { id: updateArticleTagDto.id }, updateArticleTagDto, '已经存在该名称的tag');
  }
  async deleteTag(deleteArticleTagDto: DeleteArticleTagDto) {
    await this.modelService.delete('articleTag', { id: deleteArticleTagDto.id }, '已经存在该名称的tag');
  }
  async getTagList(pageDto: PageDto) {
    const data = await this.modelService.paginate('articleTag', pageDto, undefined, ArticleTagDto);
    return data
  }
  async createCategory(createArticleCategoryDto: CreateArticleCategoryDto) {
    await this.modelService.create('articleCategory', createArticleCategoryDto, createArticleCategoryDto, '已经存在该名称的category');
  }
  async updateCategory(updateArticleCategoryDto: UpdateArticleCategoryDto) {
    await this.modelService.update('articleCategory', { id: updateArticleCategoryDto.id }, updateArticleCategoryDto);
  }
  async deleteCategory(deleteArticleCategoryDto: DeleteArticleCategoryDto) {
    await this.modelService.delete('articleCategory', { id: deleteArticleCategoryDto.id });
  }
  async getCategoryList(pageDto: PageDto) {
    const data = await this.modelService.paginate('articleCategory', pageDto, undefined, ArticleCategoryDto);
    return data;
  }
  async createArticle(createArticleDto: CreateArticleDto) {
    const userId = (this.req as any).user?.userId;
    await this.modelService.create('article', {
      title: createArticleDto.title,
      tagId: createArticleDto.tagId,
      categoryId: createArticleDto.categoryId,
      createBy: userId
    });
  }
  async updateArticle(updateArticleDto: UpdateArticleDto) {
    await this.modelService.update('article', { id: updateArticleDto.id }, updateArticleDto);
  }
  async deleteArticle(deleteArticleDto: DeleteArticleDto) {
    await this.modelService.delete('article', { id: deleteArticleDto.id });

  }
  async getArticleList(pageDto: PageDto) {
    const data = await this.modelService.paginate('article', pageDto, {
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
    const formatList = data.list.map((item)=>{
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
      ...data,
      list: formatList,
    };
  }
  async getArticleInfo(getArticleDto: GetArticleDto) {
    const article = await this.modelService.findOne('article', {
        id: getArticleDto.id
    }, ArticleDto);
    return article
  }
}
