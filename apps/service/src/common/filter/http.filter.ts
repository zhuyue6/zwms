import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

interface ExceptionResponse {
  message: string
  code: number
}

// @Catch() 装饰器指定捕获 HttpException 及其子类
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // 实现 catch 方法，处理异常
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取请求上下文（此处以 Express 为例）
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus(); // 获取异常状态码
    let message: string = '';
    let code: number = -1;
    const exceptionResponse = exception.getResponse(); // 获取抛出异常内容
    if (typeof exceptionResponse === 'object') {
      message = (exceptionResponse as ExceptionResponse)?.message ?? message;
      code = (exceptionResponse as ExceptionResponse)?.code ?? code;
    } else {
      message = exceptionResponse;
    }
  
    const errorResponse = {
      data: {},
      message,
      code,
    };

    // 定制响应格式
    response.status(status);
    response.send(errorResponse);
  }
}