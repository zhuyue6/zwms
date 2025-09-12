import { get, post } from '../http'
  
export function login() {
  return post('/user/login', {
    name: 'root',
    password: '123456',
  })
}