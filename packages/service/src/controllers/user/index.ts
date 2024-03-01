import { RouterContext } from '@koa/router'
import { getParams, response } from '../common'

interface RegisterParams {
  name: string
  password: string
}

class UserController {
  login(ctx: RouterContext) {
    const params = getParams(ctx)
    response(ctx, {
      code: -1,
      message: '该用户未注册'
    })
  }
  register(ctx: RouterContext) {
    const params = getParams<RegisterParams>(ctx)
    response(ctx, {
      code: -1,
      message: `该用户${params!.name}已注册`
    })
  }
}

export default UserController