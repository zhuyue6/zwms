import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/prisma.service';
import type { LoginDto, RegisterDto } from '../dtos/user'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {

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
      return {
        code: 10002,
        message: '用户名或密码错误',
        data: undefined
      }
    }

    const access_token  = this.jwtService.sign({ name })
    return access_token
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
