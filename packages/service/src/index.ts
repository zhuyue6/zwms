import Koa from 'koa'
import cors from '@koa/cors'
import router from '@/router'
import bodyparser from 'koa-bodyparser'
import chalk from 'chalk'
import config from '../config'

const app = new Koa();
app.use(cors())
app.use(bodyparser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.port, () => {
  console.log(chalk.green(`启动成功，端口号：${config.port}`))
});