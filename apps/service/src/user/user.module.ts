import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt'
import { jwt } from '../const'

@Module({
  imports: [
    JwtModule.register({
      secret: jwt.jwtConfig.secret,
      signOptions: { 
        expiresIn: jwt.jwtConfig.expiresIn 
      },
    })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
