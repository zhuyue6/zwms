import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service'
import type { LoginDto, RegisterDto } from '../dtos/user'
import { Public } from '../common/decorators'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {

  }
  @Public()
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
  @Public()
  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }
  @Post('/test')
  test(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }
}