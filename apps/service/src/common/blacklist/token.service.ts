import { JwtService } from '@nestjs/jwt';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RedisService } from '../../modules/redis.service';

@Injectable()
export class TokenBlackListService {
  constructor(
    private redisService: RedisService, // 注入RedisService
    private jwtService: JwtService,
  ) {}
  async add(token: string) {
    // 对token 进行解码获取过期时间exp
    try {
      const payload = await this.jwtService.decode(token);
      if (!payload.exp) return;
      // 获取当前时间
      const now = Math.floor(Date.now() / 1000);
      // 过期时间ttl = payload.exp - now
      const ttl = payload.exp - now;
      await this.redisService.set(token, '1', ttl);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async isExists(key: string) {
    return this.redisService.isExists(key);
  }
}
