import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from '../modules/prisma.service';
// import type { LoginDto, RegisterDto, UpdateDto } from './article.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ArticleService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    @Inject(REQUEST) private readonly req: Request,
  ) {}
  async getTagList() {
    const list = await this.prisma.articleTag.findMany();
    return {
      list,
    };
  }
}
