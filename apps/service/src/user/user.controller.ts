import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto, UpdateDto } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
  @Post('/logout')
  logout() {
    return this.userService.logout();
  }
  @Public()
  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }
  @Post('/update')
  update(@Body() updateDto: UpdateDto) {
    return this.userService.update(updateDto);
  }
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('/uploaderAvatar')
  uploaderAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploaderAvatar(file);
  }
  @Post('/getInfo')
  getInfo() {
    return this.userService.getInfo();
  }
}
