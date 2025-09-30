import { get, post } from '../http'
  
export function login() {
  return post('/user/login', {
    name: 'root',
    password: '123456',
  })
}

export function register() {
  return post('/user/register', {
    name: 'zhuyue',
    password: '123456',
  })
}