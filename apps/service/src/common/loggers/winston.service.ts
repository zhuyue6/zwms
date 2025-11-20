import * as winston from 'winston'
import { ConfigService } from '@nestjs/config';
import { Injectable, LoggerService } from '@nestjs/common'

@Injectable()
/**
 * 为什么要使用winston， winston满足了dev 环境打印，生产环境文件存储logger的需求
 * winston logger 服务要注意哪一些点：
 * 1.重新实现logger的 error, warn, debug, log 级别的日志输出
 * 2.实现输出的环境判定
 * 3.通用的输出点需要处理，如http filter里面的错误处理
 */
export class WinstonLoggerService  implements LoggerService {
    private logger: winston.Logger;
    constructor(private configService: ConfigService) {
        this.logger = winston.createLogger({
            level: this.configService.get<string>('LOG_LEVEL') || 'info', // 从配置读取级别
            format: winston.format.combine(
              winston.format.timestamp(), // 时间戳
              winston.format.json(), // 结构化JSON输出
            ),
            transports: this.getTransports(), // 输出目标（控制台、文件等）
          });
    }
     // 根据环境配置输出源
  private getTransports(): winston.transport[] {
    const transports: winston.transport[] = [];

    // 控制台输出（开发环境）
    if (this.configService.get<string>('NODE_ENV') === 'development') {
      transports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(), // 彩色输出
            winston.format.simple(), // 简化格式（非JSON）
          ),
        }),
      );
    }

    // 文件输出（生产环境）
    if (this.configService.get<string>('NODE_ENV') === 'production') {
      // 普通日志
      transports.push(
        new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
      );
      // 错误日志（单独存储）
      transports.push(
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      );
    }

    return transports;
  }

  // 实现LoggerService接口方法
  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  error(message: string, stack?: string, context?: string) {
    this.logger.error(message, { context, stack });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }
}