import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'
import { authenticatedRoute } from '../middlewares/authenticated-route'

export async function mealRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticatedRoute)

  app.get('/:id', async (request, reply) => {
    const getMealParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = getMealParamsSchema.parse(request.params)
    const sessionId = request.cookies.sessionId

    const user = await knex('users').where('session_id', sessionId).first()
    const meal = await knex('meals')
      .where({
        id,
        user_id: user?.id,
      })
      .first('id', 'name', 'description', 'diet', 'created_at')

    if (!meal) reply.status(404).send()

    return meal
  })

  app.get('/', async (request) => {
    const sessionId = request.cookies.sessionId
    const user = await knex('users').where('session_id', sessionId).first()
    const meals = await knex('meals')
      .where('user_id', user?.id)
      .select('id', 'name', 'description', 'diet', 'created_at')

    return meals
  })

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

  app.put('/:id', async (request, reply) => {
    const updateMealParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = updateMealParamsSchema.parse(request.params)
    const sessionId = request.cookies.sessionId

    const user = await knex('users').where('session_id', sessionId).first()

    const meal = await knex('meals')
      .where({
        id,
        user_id: user?.id,
      })
      .first('id', 'name', 'description', 'diet', 'created_at')

    if (!meal) reply.status(404).send()

    const updateMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      diet: z.boolean(),
    })

    const { name, description, diet } = updateMealBodySchema.parse(request.body)

    await knex('meals')
      .where({
        id,
        user_id: user?.id,
      })
      .update({
        name,
        description,
        diet,
      })
  })
}
