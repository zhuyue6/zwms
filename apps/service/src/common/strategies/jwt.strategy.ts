import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// nestjs 用于配置的操作包
import { ConfigService } from '@nestjs/config';
import type { JWTPayload } from '../../types/jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      // 从请求头的Authorization中提取令牌（格式：Bearer <token>）
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 不忽略过期时间（由Passport自动验证）
      secretOrKey: configService.get('JWT_SECRET') as string, // 用于验证签名的密钥
    });
  }

  // 令牌验证通过后，该方法会被调用，返回的用户信息会挂载到request.user
  validate(payload: JWTPayload) {
    // payload是JWT的Payload部分（即登录时传入的{ sub, name, role }）
    return { 
      userId: payload.sub, 
      username: payload.name, 
    };
  }
}