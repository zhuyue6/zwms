import { Injectable, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface Response<T> {
  code: number
  message: string
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse();
    response.status(200);
    return next.handle().pipe(
      map((data) => {
        return {
          code: 10000,
          data,
          message: 'suceess'
        }
      })
    )
  }
}