import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchPetsByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city-use-case'

export async function fetchPetsByCity(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string()
  })

  const { city } = searchPetsQuerySchema.parse(request.query)

  const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase()

  const { pets } = await fetchPetsByCityUseCase.execute({ city })

  return reply.status(200).send({ pets })
}