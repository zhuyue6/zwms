import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './modules/prisma.module';
import { WinstonLoggerService } from './common/loggers/winston.service';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { MulterModule } from '@nestjs/platform-express';
import { JwtGuard } from './common/guards/jwt.guard';
import { ConfigModule } from '@nestjs/config';
import { OssModule } from './common/oss/oss.module';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    OssModule,
    ConfigModule,
    MulterModule.register({
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB限制
    }),
  ],
  controllers: [AppController],
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
    WinstonLoggerService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('user');
  }
}
