import { IsName, IsPassword } from '../common/pipes/validator.pipe';
import {
  IsOptional,
  IsNumber,
  IsString
} from 'class-validator';
import { Expose, Exclude } from 'class-transformer'


// user 对象属性集合
export class UserDto {
  @Expose()
  id: number
  @Expose()
  name: string;
  @Expose()
  age: number;
  @Exclude()
  password: string;
  @Expose()
  avatarUrl: string
  @Expose()
  permission: number;
}

export class LoginDto implements Pick<UserDto, 'name' | 'password'> {
  @IsName()
  name: string;
  @IsPassword()
  password: string;
}

export class RegisterDto implements Pick<UserDto, 'name' | 'password'> {
  @IsName()
  name: string;
  @IsPassword()
  password: string;
}

export class UpdateDto implements Pick<UserDto, 'name' | 'password'> {
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
  permission: number;
}

export class DeleteDto implements Pick<UserDto, 'id'> {
  @IsNumber()
  id: number
}