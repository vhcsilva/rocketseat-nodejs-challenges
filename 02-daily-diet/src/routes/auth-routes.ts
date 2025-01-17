import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import { z } from 'zod'

import { knex } from '../database'

const HASH_SALT = 12

export async function authRoutes(app: FastifyInstance) {
  app.post('/signup', async (request, reply) => {
    const signUpBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { data, success } = signUpBodySchema.safeParse(request.body)

    if (!success)
      return reply.status(400).send({
        error: 'Missing parameters',
      })

    const { name, email, password } = data

    const checkEmail = await knex('users').where('email', email).first()

    if (checkEmail)
      reply.status(400).send({
        error: 'Email already exists',
      })

    const id = randomUUID()
    const passwordHash = await bcrypt.hash(password, HASH_SALT)

    await knex('users').insert({
      id,
      name,
      email,
      password: passwordHash,
    })

    return {
      id,
      name,
      email,
    }
  })

  app.post('/signin', async (request, reply) => {
    const signInBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { data, success } = signInBodySchema.safeParse(request.body)

    if (!success)
      return reply.status(400).send({
        error: 'Missing parameters',
      })

    const { email, password } = data

    const user = await knex('users').where('email', email).first()

    if (!user) return reply.status(400).send()

    if (!(await bcrypt.compare(password, user.password)))
      return reply.status(400).send({
        error: 'Invalid credentials',
      })

    const sessionId = randomUUID()

    await knex('users').where('id', user.id).update('session_id', sessionId)

    reply.cookie('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return reply.status(200).send()
  })
}
