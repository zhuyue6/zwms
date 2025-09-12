import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()  // 全局模块，其他模块无需导入即可使用
@Module({
  providers: [PrismaService],
  exports: [PrismaService],  // 导出服务供其他模块使用
})
export class PrismaModule {}