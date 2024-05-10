import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { authRoutes } from './routes/auth-routes'
import { mealRoutes } from './routes/meal-routes'

export const app = fastify()

app.register(cookie)

app.register(authRoutes, {
  prefix: 'auth',
})

app.register(mealRoutes, {
  prefix: 'meals',
})
