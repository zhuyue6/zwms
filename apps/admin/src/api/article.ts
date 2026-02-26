import { get, post } from '../http'
import { Tag, Category } from '../types'

interface CreateTagDto extends Pick<Tag, 'tagName'> {}
interface UpdateTagDto extends Pick<Tag, 'tagName' | 'id'> {}
interface DelTagDto extends Pick<Tag, 'id'> {}
interface CreateCategoryDto extends Pick<Category, 'categoryName'> {}
interface UpdateCategoryDto extends Pick<Category, 'categoryName' | 'id'> {}
interface DelCategoryDto extends Pick<Category, 'id'> {}

export function getTagList() {
  return post('/article/getTagList')
}

export function createTag(createTagDto: CreateTagDto) {
  return post('/article/createTag', createTagDto)
}

export function updateTag(updateTagDto: UpdateTagDto) {
  return post('/article/updateTag', updateTagDto)
}

export function deleteTag(delTagDto: DelTagDto) {
  return post('/article/deleteTag', delTagDto)
}

export function getCategoryList() {
  return post('/article/getCategoryList')
}

export function createCategory(createCategoryDto: CreateCategoryDto) {
  return post('/article/createCategory', createCategoryDto)
}

export function updateCategory(updateCategoryDto: UpdateCategoryDto) {
  return post('/article/updateCategory', updateCategoryDto)
}

export function deleteCategory(delCategoryDto: DelCategoryDto) {
  return post('/article/deleteCategory', delCategoryDto)
}