import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // 允许的前端域名（生产环境需指定具体域名）
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的请求方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
    credentials: true, // 允许跨域请求携带 Cookie（需前端配合设置 withCredentials: true）
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
