import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'
import { authenticatedRoute } from '../middlewares/authenticated-route'

export async function mealRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticatedRoute)

  app.post('/', async (request, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      diet: z.boolean(),
    })

    const { name, description, diet } = createMealBodySchema.parse(request.body)

    const id = randomUUID()
    const sessionId = request.cookies.sessionId
    const user = await knex('users').where('session_id', sessionId).first()

    await knex('meals').insert({
      id,
      name,
      description,
      diet,
      user_id: user?.id,
    })

    reply.status(201).send({
      id,
      name,
      description,
    })
  })
}
