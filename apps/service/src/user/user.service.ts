import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core'
import { PrismaService } from '../modules/prisma.service';
import type { LoginDto, RegisterDto, UpdateDto } from './user.dto'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, @Inject(REQUEST) private readonly req: Request ) {

  }

  // jwt 原理
  // jwt 解决了什么问题
  // jwt header payload signature
  // jwt 是每一次通过header、payload组成的data生成的。只有保证每一次生成的signature 是同一个就通过验证
  async login(loginDto: LoginDto) {
    // 连接数据库，查询用户名和密码
    const { name, password } = loginDto ?? {}
    // 1. 查询用户是否存在
    const user = await this.prisma.user.findFirst({
      where: { name },
    });

    if (!user || password !== user.password) {
      // 若不存在用户或者密码不一致则登录失败
      return {
        code: 10002,
        message: '用户名或密码错误',
        data: undefined
      }
    }
    const payload = {
      sub: user.id,
      name: user.name
    }


    // 登录成功，返回jwt_token
    const access_token  = this.jwtService.sign(payload)
    return { 
      access_token,
      user
    }
  }
  async update(updateDto: UpdateDto) {
    const userId = (this.req as any).user?.userId
    // 1. 查询用户是否存在
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    if (user) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          password: updateDto.password
        }
      });
    }
  }
  async register(registerDto: RegisterDto) {
    const { name, password } = registerDto ?? {}
    // 1. 查询用户是否存在
    const user = await this.prisma.user.findFirst({
      where: { name },
    });
    if (user) {
      return {
        code: 10001,
        message: '账号已存在',
        data: undefined
      }
    }
    // 账号注册
    await this.prisma.user.create({
      data: {
        name,
        age: 10,
        password,
      }
    })
  }
}
