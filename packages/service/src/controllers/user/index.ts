import { RouterContext } from '@koa/router'
import { getParams, response } from '../common'
import { user } from '@/models'

interface userLoginParams {
  name: string
  password: string
}

class UserController {
  async login(ctx: RouterContext) {
    const params = getParams<userLoginParams>(ctx)
    const result = await user
      .login(params!.name, params!.password)
      .catch(() => {
        response(ctx, {
          code: -1,
          message: `用户名或密码错误`,
        })
        return { code: -1 }
      })
    if (result.code === 0) {
      response(ctx, {
        code: 0,
        message: '用户登录成功',
        data: (result as any).data,
      })
    }
  }
  async register(ctx: RouterContext) {
    const params = getParams<userLoginParams>(ctx)
    const result = await user.getUserByName(params!.name).catch(() => {
      response(ctx, {
        code: -1,
        message: `该用户${params!.name}已注册`,
      })
      return { code: -1 }
    })
    if (result.code === 0) {
      response(ctx, {
        code: 0,
        message: '用户注册成功',
        data: (result as any).data,
      })
    }
  }
}

export default UserController
