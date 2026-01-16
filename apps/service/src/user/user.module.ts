import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenBlackListService } from '../common/blacklist/token.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // 导入配置模块
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // 从环境变量读取密钥
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN') || '1h', // 从环境变量读取过期时间
        },
      }),
      inject: [ConfigService], // 注入配置服务
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, TokenBlackListService],
})
export class UserModule {}
