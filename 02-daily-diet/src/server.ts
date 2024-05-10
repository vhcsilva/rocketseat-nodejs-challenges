import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { authRoutes } from './routes/auth-routes'
import { mealRoutes } from './routes/meal-routes'

const PORT = 3333
const app = fastify()

app.register(cookie)

app.register(authRoutes, {
  prefix: 'auth',
})

app.register(mealRoutes, {
  prefix: 'meals',
})

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log('Server running on port:', PORT)
  })
