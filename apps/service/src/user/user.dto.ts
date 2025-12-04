import { IsName, IsPassword } from '../common/pipes/validator.pipe';

//
class UserInfo {
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

export class UpdateDto implements Pick<UserInfo, 'password'> {
  password: string;
}

export interface UploaderAvatarDto {
  url: string;
}
