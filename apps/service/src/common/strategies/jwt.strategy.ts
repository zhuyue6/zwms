import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// nestjs 用于配置的操作包
import { ConfigService } from '@nestjs/config';
import type { JWTPayload } from '../../types/jwt'
import { TokenBlackListService } from '../blacklist/token.service'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService, 
    private tokenBlacklistService: TokenBlackListService,
  ) {
    super({
      // 从请求头的Authorization中提取令牌（格式：Bearer <token>）
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 不忽略过期时间（由Passport自动验证）
      secretOrKey: configService.get('JWT_SECRET') as string, // 用于验证签名的密钥
      passReqToCallback: true, // 开启后，validate的第一个参数会是request对象
    });
  }

  // 令牌验证通过后，该方法会被调用，返回的用户信息会挂载到request.user
  async validate(request: Request, payload: JWTPayload) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request)
    // payload是JWT的Payload部分（即登录时传入的{ sub, name, role }）

    const isBlacklisted = await this.tokenBlacklistService.isExists(token!)

    if (isBlacklisted) {
      throw new UnauthorizedException('令牌已失效，请重新登录');
    }

    return { 
      userId: payload.sub, 
      username: payload.name, 
    };
  }
}