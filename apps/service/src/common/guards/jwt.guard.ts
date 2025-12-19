import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../const/reflector'
/**
 * jwt guard需要拥有直接通行无需校验和校验验证的能力，这里使用public来标注直接
 * 通行的路由
 */
@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super(); // 继承AuthGuard('jwt')的逻辑（JWT验证核心）
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // 检查方法级装饰器（如@Post('login')上的@Public()）
      context.getClass(), // 检查类级装饰器（如整个Controller都无需认证）
    ]);
    if (isPublic) {
      return true
    }
    return super.canActivate(context);
  }
}