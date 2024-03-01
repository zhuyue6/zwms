import Koa from 'koa'
import cors from '@koa/cors'
import router from '@/router'
import bodyparser from 'koa-bodyparser'

const app = new Koa();
app.use(cors())
app.use(bodyparser())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000);