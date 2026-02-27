import { utils } from '@zwms/shared'
import { Expose, Transform } from 'class-transformer'
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';


export class ArticleTagDto {
  @Expose()
  @Transform(({ value }) => value?.toString()) 
  id: number
  @Expose()
  tagName: string
  @Expose()
  @Transform(({ value }) => utils.formatDate(value))
  createTime: string
  @Expose()
  @Transform(({ value }) => utils.formatDate(value))
  updateTime: string
}

export class CreateArticleTagDto implements Pick<ArticleTagDto, 'tagName'> {
  @IsNotEmpty()
  tagName: string
}

export class UpdateArticleTagDto implements Pick<ArticleTagDto, 'id' | 'tagName'> {
  @IsNumber()
  id: number
  @IsNotEmpty()
  tagName: string
}

export class DeleteArticleTagDto implements Pick<ArticleTagDto, 'id'> {
  @IsNumber()
  id: number
}


export class ArticleCategoryDto {
  @Expose()
  @Transform(({ value }) => value?.toString()) 
  id: number
  @Expose()
  categoryName: string
  @Expose()
  @Transform(({ value }) => utils.formatDate(value))
  createTime: string
  @Expose()
  @Transform(({ value }) => utils.formatDate(value))
  updateTime: string
}

export class CreateArticleCategoryDto implements Pick<ArticleCategoryDto, 'categoryName'> {
  @IsNotEmpty()
  categoryName: string
}

export class UpdateArticleCategoryDto implements Pick<ArticleCategoryDto, 'id' | 'categoryName'> {
  @IsNumber()
  id: number
  @IsNotEmpty()
  categoryName: string
}

export class DeleteArticleCategoryDto implements Pick<ArticleCategoryDto, 'id'> {
  @IsNumber()
  id: number
}

export class ArticleDto {
  @Expose()
  @Transform(({ value }) => value?.toString()) 
  id: number
  @Expose()
  title: string
  @Expose()
  @Transform(({ value }) => value?.toString()) 
  categoryId: number
  @Expose()
  categoryName: string
  @Expose()
  @Transform(({ value }) => value?.toString()) 
  tagId: number
  @Expose()
  tagName: string
  @Expose()
  contentMd: string
  @Expose()
  contentHtml: string
  @Expose()
  summary: string
  @Expose()
  status: number
  @Expose()
  viewCount: number
  @Expose()
  createBy: number
  @Expose()
  creatorName: string
  @Expose()
  @Transform(({ value }) => utils.formatDate(value))
  createTime: string
  @Expose()
  @Transform(({ value }) => utils.formatDate(value))
  updateTime: string
}

export class CreateArticleDto implements Pick<ArticleDto, 'title' | 'categoryId' | 'tagId'> {
  @IsString()
  title: string
  @IsNumber()
  categoryId: number
  @IsNumber()
  tagId: number
}

export class UpdateArticleDto implements Pick<ArticleDto, 'id' | 'title' | 'categoryId' | 'tagId'> {
  @IsNumber()
  id: number
  @IsString()
  title: string
  @IsNumber()
  categoryId: number
  @IsNumber()
  tagId: number
}

export class DeleteArticleDto implements Pick<ArticleDto, 'id'> {
  @IsNumber()
  id: number
}