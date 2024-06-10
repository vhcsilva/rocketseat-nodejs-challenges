import fastify from 'fastify'
import { ZodError } from 'zod'

import { usersRoutes } from '@/http/controllers/users/routes'
import { env } from '@/env'

export const app = fastify()

app.register(usersRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError)
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })

  if (env.NODE_ENV !== 'production') console.error(error)
  else {
    // TODO: Should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: 'Internal Server Error',
  })
})