import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleTagDto } from './article.dto';
import { Public } from '../common/decorators';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {

  }
  @Post('/createTag')
  createTag(createArticleTagDto: CreateArticleTagDto) {
    return this.articleService.createTag(createArticleTagDto);
  }
  @Post('/getTagList')
  getTagList() {
    return this.articleService.getTagList();
  }
}
