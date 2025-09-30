class UserInfo {
  name: string
  password: string;
}


export class LoginDto implements Pick<UserInfo, 'name'| 'password'> {
  name: string;
  password: string;
}

export class RegisterDto implements Pick<UserInfo, 'name'| 'password'> {
  name: string;
  password: string;
}