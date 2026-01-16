import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global() // 全局模块，其他模块无需导入即可使用
@Module({
  providers: [RedisService],
  exports: [RedisService], // 导出服务供其他模块使用
})
export class RedisModule {}
