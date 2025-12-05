import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http.filter';
import { WinstonLoggerService } from './common/loggers/winston.service';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 启用全局的校验管道
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: false, // 存在未定义的参数，直接抛出错误
      transform: true,
      exceptionFactory(errors) {
        // 对异常进行校验
        // 错误信息（取第一个约束错误）
        const formattedErrors = errors.map((err) => ({
          field: err.property, // 错误字段
          message: Object.values(err.constraints ?? {})[0],
          constraints: err.constraints, // 所有约束错误（可选）
        }));
        const message: string = formattedErrors[0]['message'];
        return new BadRequestException({
          statusCode: 400,
          message,
          errors: formattedErrors,
        });
      },
    }),
  );

  app.enableCors({
    origin: '*', // 允许的前端域名（生产环境需指定具体域名）
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的请求方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
    credentials: true, // 允许跨域请求携带 Cookie（需前端配合设置 withCredentials: true）
  });
  const winstonLoggerServiceRef = app.get(WinstonLoggerService); // app.get是通过DI来获取服务
  // app.useXX 等全局注册，默认不支持 DI，必须「显式手动注入依赖」才能让 DI 生效。
  // 如果是通过 providers 配置 { provide: APP_* , useClass/useFactory }（如 APP_FILTER、APP_GUARD）—— 「DI 容器全局注册」。DI 默认是生效的
  app.useGlobalFilters(new HttpExceptionFilter(winstonLoggerServiceRef));
  app.useLogger(winstonLoggerServiceRef);
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/static/', // 访问前缀，如 /static/avatar/xxx.jpg
  });
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
