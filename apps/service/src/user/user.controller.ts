import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service'
import type { LoginDto, RegisterDto } from '../dtos/user'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {

  }
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }
}