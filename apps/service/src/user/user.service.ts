import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ModelService, type PageDto } from '../models/model.service';
import { type LoginDto, type RegisterDto, type UpdateDto,type DeleteDto, UserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { OssService } from '../common/oss/oss.service';
import { TokenBlackListService } from '../common/blacklist/token.service';
import { plainToClass } from 'class-transformer'
import { BusinessException, ErrorCode } from '../common/errors';

@Injectable()
export class UserService {
  constructor(
    private modelService: ModelService,
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
    const user = await this.modelService.findOne('user',  { name })

    if (!user || password !== user.password) {
      // 若不存在用户或者密码不一致则登录失败
      throw new BusinessException(ErrorCode.USER_NAME_OR_PASSWORD_ERROR, '用户名或密码错误');
    }
    const payload = {
      id: user.id,
      permission: user.permission,
      name: user.name,
    };

    // 登录成功，返回jwt_token
    const token = this.jwtService.sign(payload);
    const userDto = plainToClass(UserDto, user)
    return {
      token,
      user: userDto,
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
    const userPermission = (this.req as any).user?.userPermission;
    // 1. 查询用户是否存在
    const user = await this.modelService.findOne('user', { id: updateDto.id });
    if (user) {
      if (user.permission === 0) {
        // 管理员直接改，先不校验
        await this.modelService.update('user', { id: updateDto.id }, updateDto);
        return
      }
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

      await this.modelService.update('user', { id: updateDto.id }, updateDto)
    }
  }
  async updateSafe(updateDto: UpdateDto, user: any) {
    if(updateDto.password !== user.password) {
      throw new BusinessException(ErrorCode.USER_ORIGINAL_PASSWORD_ERROR, '原始密码错误');
    }
    await this.modelService.update('user', { id: updateDto.id}, { password: updateDto.newPassword })
  }
  async delete(deleteDto: DeleteDto) {
    const { id } = deleteDto ?? {};
    await this.modelService.delete('user', { id }, '该用户账号不存在')
  }
  async register(registerDto: RegisterDto) {
    const { name, password } = registerDto ?? {};
    // 1. 查询用户是否存在
    await this.modelService.create('user', {
      name,
      age: 10,
      permission: 1,
      password,
    },  { name });
  }
  async uploaderAvatar(file: Express.Multer.File) {
    const url = await this.ossService.saveFile(file, 'avatar');
    const userId = (this.req as any).user?.userId;
    await this.modelService.update('user', { id: userId }, { avatarUrl: url });
    return {
      url,
    };
  }
  async getList(pageDto: PageDto) {
    const data = await this.modelService.paginate('user', pageDto, undefined, UserDto);
    return data;
  }
  async getInfo() {
    const userId = (this.req as any).user?.userId;
    const user = await this.modelService.findOne('user', { id: userId }, UserDto);
    return {
      user,
    };
  }
}
