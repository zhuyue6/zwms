import Router from '@koa/router'
import { UserController } from '@/controllers'

const router = new Router();

const userController = new UserController()

router.post('/login', userController.login)

router.post('/register', userController.register)

export default router