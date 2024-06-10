import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cep: z.string().length(8),
    address: z.string(),
    state: z.string().length(2),
    city: z.string(),
    phone: z.string(),
    password: z.string()
  })

  const data = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      ...data,
      role: 'ORGANIZATION',
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError)
      return reply.status(409).send({
        message: error.message,
      })

    throw error
  }

  return reply.status(201).send()
}