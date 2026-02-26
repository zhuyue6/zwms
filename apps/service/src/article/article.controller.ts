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
  DeleteArticleCategoryDto
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
}
