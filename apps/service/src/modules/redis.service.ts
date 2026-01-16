import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

/**
 * redis 服务，使用ioredis进行封装
 * 使用场景目前主要是
 * 1. jwt token退出黑名单
 */
@Injectable()
export class RedisService {
  redis: Redis;
  constructor() {
    this.redis = new Redis();
  }
  async set(key: string, value: string, ttl: number) {
    return this.redis.set(key, value, 'EX', ttl);
  }
  async isExists(key: string) {
    const result = await this.redis.exists(key);
    return result === 1;
  }
}
