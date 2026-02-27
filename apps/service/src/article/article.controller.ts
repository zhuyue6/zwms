import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { 
  CreateArticleTagDto, 
  UpdateArticleTagDto, 
  DeleteArticleTagDto,
  CreateArticleCategoryDto,
  UpdateArticleCategoryDto,
  DeleteArticleCategoryDto,
  CreateArticleDto,
  UpdateArticleDto,
  DeleteArticleDto
} from './article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {

  }
  @Post('/createTag')
  createTag(@Body() createArticleTagDto: CreateArticleTagDto) {
    return this.articleService.createTag(createArticleTagDto);
  }
  @Post('/updateTag')
  updateTag(@Body() updateArticleTagDto: UpdateArticleTagDto) {
    return this.articleService.updateTag(updateArticleTagDto);
  }
  @Post('/deleteTag')
  deleteTag(@Body() deleteArticleTagDto: DeleteArticleTagDto) {
    return this.articleService.deleteTag(deleteArticleTagDto);
  }
  @Post('/getTagList')
  getTagList() {
    return this.articleService.getTagList();
  }
  @Post('/createCategory')
  createCategory(@Body() createArticleCategoryDto: CreateArticleCategoryDto) {
    return this.articleService.createCategory(createArticleCategoryDto);
  }
  @Post('/updateCategory')
  updateCategory(@Body() updateArticleCategoryDto: UpdateArticleCategoryDto) {
    return this.articleService.updateCategory(updateArticleCategoryDto);
  }
  @Post('/deleteCategory')
  deleteCategory(@Body() deleteArticleCategoryDto: DeleteArticleCategoryDto) {
    return this.articleService.deleteCategory(deleteArticleCategoryDto);
  }
  @Post('/getCategoryList')
  getCategoryList() {
    return this.articleService.getCategoryList();
  }
  @Post('/createArticle')
  createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.createArticle(createArticleDto);
  }
  @Post('/updateArticle')
  updateArticle(@Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.updateArticle(updateArticleDto);
  }
  @Post('/deleteArticle')
  deleteArticle(@Body() deleteArticleDto: DeleteArticleDto) {
    return this.articleService.deleteArticle(deleteArticleDto);
  }
  @Post('/getArticleList')
  getArticleList() {
    return this.articleService.getArticleList();
  }
}
