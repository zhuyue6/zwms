import { get, post } from '../http'
import { Tag } from '../types'

interface CreateTagDto extends Pick<Tag, 'tagName'> {}

export function getTagList() {
  return post('/article/getTagList')
}

export function createTag(createTagDto: CreateTagDto) {
  return post('/article/createTag', createTagDto)
}

export function updateTag() {
  return post('/article/updateTag')
}

export function deleteTag() {
  return post('/article/deleteTag')
}