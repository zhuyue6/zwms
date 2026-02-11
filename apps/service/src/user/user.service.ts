import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from '../modules/prisma.service';
import type { LoginDto, RegisterDto, UpdateDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { OssService } from '../common/oss/oss.service';
import { TokenBlackListService } from '../common/blacklist/token.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private ossService: OssService,
    private tokenBlackListService: TokenBlackListService,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  // jwt 原理
  // jwt 解决了什么问题
  // jwt header payload  signature
  // jwt 是每一次通过header、payload组成的data生成的。只有保证每一次生成的signature 是同一个就通过验证
  // jwt 退出登录情况下，没有过期的token要加入黑名单
  async login(loginDto: LoginDto) {
    // 连接数据库，查询用户名和密码
    const { name, password } = loginDto ?? {};
    // 1. 查询用户是否存在
    const user = await this.prisma.user.findFirst({
      where: { name },
    });

    if (!user || password !== user.password) {
      // 若不存在用户或者密码不一致则登录失败
      return {
        code: 10002,
        message: '用户名或密码错误',
        data: undefined,
      };
    }
    const payload = {
      sub: user.id,
      name: user.name,
    };

    Reflect.deleteProperty(user, password);

    // 登录成功，返回jwt_token
    const token = this.jwtService.sign(payload);
    return {
      token,
      user,
    };
  }
  async logout() {
    const token: string = (this.req.headers as any)?.authorization?.replace(
      'Bearer ',
      '',
    );
    if (token) {
      await this.tokenBlackListService.add(token);
    }
    return {
      message: '用户退出成功',
    };
  }
  async update(updateDto: UpdateDto) {
    const userId = (this.req as any).user?.userId;
    // 1. 查询用户是否存在
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    if (user) {
      // 判断原始密码是否正确
      if(updateDto.password) {
        return this.updateSafe(updateDto, user)
      }
      const updateData: Partial<UpdateDto> = {}
      if (updateDto.name) {
        updateData.name = updateDto.name
      }
      if (updateDto.age) {
        updateData.age = updateDto.age
      }

      await this.prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
    }
  }
  async updateSafe(updateDto: UpdateDto, user: any) {
    if(updateDto.password !== user.password) {
      return {
        code: 10003,
        message: '原始密码错误',
        data: undefined,
      };
    }
    await this.prisma.user.update({
      where: { id: user.userId },
      data: {
        password: updateDto.newPassword,
      },
    });
  }
  async register(registerDto: RegisterDto) {
    const { name, password } = registerDto ?? {};
    // 1. 查询用户是否存在
    const user = await this.prisma.user.findFirst({
      where: { name },
    });
    if (user) {
      return {
        code: 10001,
        message: '账号已存在',
        data: undefined,
      };
    }
    // 账号注册
    await this.prisma.user.create({
      data: {
        name,
        age: 10,
        permission: 1,
        password,
      },
    });
  }
  async uploaderAvatar(file: Express.Multer.File) {
    const url = await this.ossService.saveFile(file, 'avatar');
    const userId = (this.req as any).user?.userId;
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        avatarUrl: url,
      },
    });
    return {
      url,
    };
  }
  async getInfo() {
    const userId = (this.req as any).user?.userId;
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    if (user) {
      Reflect.deleteProperty(user, 'password');
    }
    return {
      user,
    };
  }
}
