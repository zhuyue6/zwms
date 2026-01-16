import { get, post } from '../http'
import { User } from '../types'

type UserVerify = Pick<User, 'name' | 'password' | ''>

export function login(params: UserVerify) {
  return post('/user/login', params)
}

export function register(params: UserVerify) {
  return post('/user/register', params)
}

export function update(params: UserVerify) {
  return post('/user/update', params)
}

export function getInfo() {
  return post('/user/getInfo')
}

export function logout() {
  return post('/user/logout')
}