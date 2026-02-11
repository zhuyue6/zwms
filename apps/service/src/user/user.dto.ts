import { IsName, IsPassword } from '../common/pipes/validator.pipe';
import {
  IsOptional,
  IsNumber
} from 'class-validator';

//
class UserInfo {
  id: number
  name: string;
  age: number;
  password: string;
}

export class LoginDto implements Pick<UserInfo, 'name' | 'password'> {
  name: string;
  password: string;
}

export class RegisterDto implements Pick<UserInfo, 'name' | 'password'> {
  @IsName()
  name: string;
  @IsPassword()
  password: string;
}

export class UpdateDto implements Pick<UserInfo, 'name' | 'password'> {
  @IsOptional()
  @IsName()
  name: string;
  @IsOptional()
  @IsPassword()
  password: string;
  @IsOptional()
  @IsPassword()
  newPassword: string;
  @IsOptional()
  @IsNumber()
  age: number;
  @IsOptional()
  @IsNumber()
  permission;
}

export class DeleteDto implements Pick<UserInfo, 'id'> {
  id: number
}

export interface UploaderAvatarDto {
  url: string;
}

export { UserInfo as UserInfoDto };
