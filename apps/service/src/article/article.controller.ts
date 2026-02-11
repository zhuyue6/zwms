import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ArticleService } from './article.service';
// import {  } from './article.dto';
import { Public } from '../common/decorators';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {

  }
  @Post('/getTagList')
  tagList() {
    return this.articleService.getTagList();
  }
}
