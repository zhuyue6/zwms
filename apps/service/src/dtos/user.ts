class UserInfo {
  name: string
  password: string;
}


export class LoginDto implements Pick<UserInfo, 'name'| 'password'> {
  name: string;
  password: string;
}


