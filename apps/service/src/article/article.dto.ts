import { utils } from '@zwms/shared'
import { Expose, Transform } from 'class-transformer'
import { IsName } from '../common/pipes/validator.pipe';
import { IsNumber, IsNotEmpty } from 'class-validator';


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