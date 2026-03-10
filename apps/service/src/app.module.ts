import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_GUARD, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ModelModule } from './models/model.module';
import { WinstonLoggerService } from './common/loggers/winston.service';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { MulterModule } from '@nestjs/platform-express';
import { JwtGuard } from './common/guards/jwt.guard';
import { ConfigModule } from '@nestjs/config';
import { OssModule } from './common/oss/oss.module';
import { memoryStorage } from 'multer';
import { GlobalExceptionFilter } from './common/filters/global.filter';
import { ArticleModule } from './article/article.module'

@Module({
  imports: [
    UserModule,
    ArticleModule,
    ModelModule,
    OssModule,
    ConfigModule.forRoot({
      isGlobal: true, // 全局生效，所有模块无需重复导入
      envFilePath: '.env', // 明确指定 .env 路径（根目录），避免路径问题
      ignoreEnvFile: false, // 不忽略 .env 文件（默认 false，显式写更稳妥）
    }),
    MulterModule.register({
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB限制
    }),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    WinstonLoggerService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('user');
  }
}
