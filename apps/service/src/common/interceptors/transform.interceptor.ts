import {
  Injectable,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { utils } from '@zwms/shared'

interface Response<T> {
  code: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse();
    response.status(200);
    return next.handle().pipe(
      map((data) => {
        // 如果返回有code值就是正常填充，如果没有默认10000成功
        const code = data?.code ?? 10000
        const message = data?.message ?? 'success'
        let responseData = data?.data ?? {}
        if (utils.isUndef(data?.code) && utils.isUndef(data?.message) && utils.isUndef(data?.data)) {
          // 如果data中data、code、message都不存在的话，使用data作为数值响应
          responseData = data ?? {}
        }

        return {
          code,
          data: responseData,
          message,
        };
      }),
    );
  }
}
