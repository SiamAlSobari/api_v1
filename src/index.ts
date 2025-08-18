import { Hono } from 'hono'
import { authController } from './http/controllers/auth.controller'

const app = new Hono().basePath('api')
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route('/auth', authController)

export default app
