export class ArticleTagDto {
  id: number
  tagName: string
}

export class CreateArticleTagDto implements Pick<ArticleTagDto, 'tagName'> {
  tagName: string
}