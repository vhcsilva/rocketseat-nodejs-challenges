import { FastifyInstance } from 'fastify'

import { register } from '@/http/controllers/users/register'
import { signIn } from '@/http/controllers/users/sign-in'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/sign-in', signIn)
}