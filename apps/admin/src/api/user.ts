import { get, post } from '../http'
import { User } from '../types'

type LoginRegisterParams = Pick<User, 'name' | 'password'>
type UpdateParams = Partial<Pick<User, 'name' | 'password' | 'age'>>

export function login(params: LoginRegisterParams) {
  return post('/user/login', params)
}

export function register(params: LoginRegisterParams) {
  return post('/user/register', params)
}

export function update(params: UpdateParams) {
  return post('/user/update', params)
}

export function uploadAvatar(file: File) {
  const form = new FormData()
  form.append('avatar', file)
  return post('/user/uploaderAvatar', form)
}

export function getInfo() {
  return post('/user/getInfo')
}

export function logout() {
  return post('/user/logout')
}