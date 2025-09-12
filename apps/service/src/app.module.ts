import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './modules/prisma.module';
import { LoggerMiddleware  } from './common/logger/logger.middleware'
import { TransformInterceptor } from './common/transform.interceptor'

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor
  }],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('user');
  }
}
