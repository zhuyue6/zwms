import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http.filter'
import { WinstonLoggerService } from './common/loggers/winston.service'
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启用全局的校验管道
  app.useGlobalPipes(new ValidationPipe({
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
      const message: string = formattedErrors[0]['message']
      return new BadRequestException({
        statusCode: 400,
        message,
        errors: formattedErrors,
      })
    }
  }))

  app.enableCors({
    origin: '*', // 允许的前端域名（生产环境需指定具体域名）
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的请求方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
    credentials: true, // 允许跨域请求携带 Cookie（需前端配合设置 withCredentials: true）
  });
  const winstonLoggerService = app.get(WinstonLoggerService) // app.get是通过DI来获取服务
  app.useGlobalFilters(new HttpExceptionFilter(winstonLoggerService))
  app.useLogger(winstonLoggerService)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
