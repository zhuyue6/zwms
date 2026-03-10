import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './enum';

/*
自定义异常类，用于处理业务异常
*/

interface CustomExceptionOptions {
  code: ErrorCode;
  message: string;
  statusCode?: HttpStatus;
  details?: any; // 可选，用于存放详细信息（如验证错误字段）
}

export class CustomBaseException extends HttpException {
  public readonly code: ErrorCode;
  public readonly details: any;

  constructor(options: CustomExceptionOptions) {
    const {
      code,
      message,
      statusCode = 200,
      details,
    } = options;

    // 调用父类 HttpException 构造函数，传入响应体和状态码
    super(
      {
        code,
        message,
        details,
      },
      statusCode,
    );

    this.code = code;
    this.details = details;
  }
}