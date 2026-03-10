import { get, post, http } from '../http'
import { Tag, Category, Article, PageDto } from '../types'

interface CreateTagDto extends Pick<Tag, 'tagName'> {}
interface UpdateTagDto extends Pick<Tag, 'tagName' | 'id'> {}
interface DelTagDto extends Pick<Tag, 'id'> {}
interface CreateCategoryDto extends Pick<Category, 'categoryName'> {}
interface UpdateCategoryDto extends Pick<Category, 'categoryName' | 'id'> {}
interface DelCategoryDto extends Pick<Category, 'id'> {}
interface CreateArticleDto extends Pick<Article, 'categoryId' | 'title'> {
  tagId?: number
}
interface UpdateArticleDto extends Pick<Article, 'id' | 'categoryId' | 'title'> {
  tagId?: number
}
interface DelArticleDto extends Pick<Article, 'id'> {}

export function getTagList(pageDto: PageDto) {
  return post('/api/article/getTagList', pageDto)
}

export function createTag(createTagDto: CreateTagDto) {
  return post('/api/article/createTag', createTagDto)
}

export function updateTag(updateTagDto: UpdateTagDto) {
  return post('/api/article/updateTag', updateTagDto)
}

export function deleteTag(delTagDto: DelTagDto) {
  return post('/api/article/deleteTag', delTagDto)
}

export function getCategoryList(pageDto: PageDto) {
  return post('/api/article/getCategoryList', pageDto)
}

export function createCategory(createCategoryDto: CreateCategoryDto) {
  return post('/api/article/createCategory', createCategoryDto)
}

export function updateCategory(updateCategoryDto: UpdateCategoryDto) {
  return post('/api/article/updateCategory', updateCategoryDto)
}

export function deleteCategory(delCategoryDto: DelCategoryDto) {
  return post('/api/article/deleteCategory', delCategoryDto)
}

export function getArticleList(pageDto: PageDto) {
  return post('/api/article/getArticleList', pageDto)
}

export function getArticleInfo(id: number) {
  return post('/api/article/getArticleInfo', {
    id,
  })
}

export function createArticle(createArticleDto: CreateArticleDto) {
  return post('/api/article/createArticle', createArticleDto)
}

export function updateArticle(updateArticleDto: UpdateArticleDto) {
  return post('/api/article/updateArticle', updateArticleDto)
}

export function deleteArticle(delArticleDto: DelArticleDto) {
  return post('/api/article/deleteArticle', delArticleDto)
}