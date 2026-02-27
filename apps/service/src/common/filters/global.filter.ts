import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  NotFoundException,
  ServiceUnavailableException,
  BadRequestException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { WinstonLoggerService } from '../loggers/winston.service';

interface ExceptionResponse {
  message: string;
  code: number;
}

// 捕获所有的异常进行处理
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private logger: WinstonLoggerService) {}
  catch(exception: unknown, host: ArgumentsHost) {
    // 获取请求上下文（此处以 Express 为例）
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const userIdMessage = (request?.user as any)?.userId
      ? `userId: ${(request?.user as any).userId}`
      : '';

    const { message, code, status, stack } = this.handleException(exception);
    const errorMessage = `userId: ${userIdMessage}, ${message}`;
    this.logger.error(errorMessage, stack);
    const errorResponse = {
      data: {},
      message,
      code,
    };

    // 定制响应格式
    response.status(status);
    response.send(errorResponse);
  }
  handleException(exception: unknown) {
    let code = -1;
    let message = (exception as any)?.message ?? '';
    let status = 200;
    let stack: undefined | string = (exception as any)?.stack ?? undefined;
    if (
      exception instanceof HttpException ||
      exception instanceof NotFoundException ||
      exception instanceof ServiceUnavailableException ||
      exception instanceof BadRequestException
    ) {
      const exceptionResponse = exception.getResponse(); // 获取抛出异常内容
      status = exception.getStatus();
      stack = exception.stack;
      if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as ExceptionResponse)?.message ?? message;
        code = (exceptionResponse as ExceptionResponse)?.code ?? code;
      } else {
        message = exceptionResponse;
      }
    }
    return {
      code,
      message,
      status,
      stack,
    };
  }
}
