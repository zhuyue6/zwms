import { post } from '@/http'
import {user} from '@/apis'

interface LoginParams {
  name: string
  password: string
}

export function login(params: LoginParams) {
  return post(user.login, params)
}

interface RegisterParams {
  name: string
  password: string
}

export function register(params: RegisterParams) {
  return post(user.register, params)
}