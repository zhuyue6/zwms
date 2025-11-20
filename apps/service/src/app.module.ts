import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './modules/prisma.module';
import { WinstonLoggerService  } from './common/loggers/winston.service'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { JwtGuard } from './common/guards/jwt.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, PrismaModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor
  }, {
    provide: APP_GUARD,
    useClass: JwtGuard
  }, WinstonLoggerService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes('user');
  }
}
