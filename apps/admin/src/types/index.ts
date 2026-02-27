export interface User {
  id: number
  name: string
  password: string
  avatarUrl: string
  age: number
}

export interface Tag {
  id: number
  tagName: string
}

export interface Category {
  id: number
  categoryName: string
}

export interface Article {
  id: number
  title: string
  tagId: number
  categoryId: number
  contentMd: string
  contentHtml: string
  summary: string
  status: number
  viewCount: number
  createBy: string
  createTime: string
  updateTime: string
}