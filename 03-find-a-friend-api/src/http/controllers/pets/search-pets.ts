import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    type: z.enum(['DOG', 'CAT']).optional(),
    energy: z.enum(['LOWEST', 'LOW', 'REGULAR', 'HIGH', 'HIGHEST']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    environment: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    dependency: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional()
  })

  const {
    city,
    type,
    energy,
    size,
    environment,
    dependency
  } = searchPetsQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    type,
    energy,
    size,
    environment,
    dependency
  })

  return reply.status(200).send({ pets })
}