import { RouterContext } from '@koa/router'

export function getParams<T>(ctx: RouterContext): T | null {
  const method = ctx.method
  let params = null
  switch (method) {
    case 'GET':
      params = ctx.request.query as T
      break
    case 'POST':
      params = ctx.request.body as T
      break
  }
  return params
}

export interface ResponseInfo<T=null> {
  code: number
  message: string
  data?: T 
}

export function response(ctx: RouterContext, responseInfo:ResponseInfo) {
  ctx.body = responseInfo
}