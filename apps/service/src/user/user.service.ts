import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/prisma.service';
import type { LoginDto } from '../dtos/user'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {

  }
  async login(loginDto: LoginDto) {
    // 连接数据库，查询用户名和密码
    const { name, password } = loginDto ?? {}
    // 1. 查询用户是否存在
    const user = await this.prisma.user.findFirst({
      where: { name },
    });

    // if (!password) {
    //   throw new UnauthorizedException('邮箱或密码错误');
    // }

    return user
  }
}
