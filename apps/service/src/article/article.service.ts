import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from '../modules/prisma.service';
import type { CreateArticleTagDto } from './article.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ArticleService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    @Inject(REQUEST) private readonly req: Request,
  ) {}
  async createTag(createArticleTagDto: CreateArticleTagDto) {
    // 1. 查询tag是否存在
    const tag = await this.prisma.articleTag.findFirst({
      where: { tagName: createArticleTagDto.tagName },
    });
    if (tag) {
      return {
        message: '已经存在该名称的tag',
      }
    }
  }
  async getTagList() {
    const list = await this.prisma.articleTag.findMany();
    return {
      list,
    };
  }
}
