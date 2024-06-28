import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-get-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    petId: z.string().uuid()
  })

  const { petId } = getPetParamsSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  try {
    const { pet } = await getPetUseCase.execute({
      petId
    })

    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return reply.status(404).send()

    throw error
  }
}