import { makeAddPetUseCase } from '@/use-cases/factories/make-add-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function addPet(request: FastifyRequest, reply: FastifyReply) {
  const addPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    type: z.enum(['DOG', 'CAT']),
    energy: z.enum(['LOWEST', 'LOW', 'REGULAR', 'HIGH', 'HIGHEST']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    environment: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    dependency: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    age: z.coerce.number(),
    pictures: z.array(z.string()),
    adoptionRequirements: z.array(z.string()),
  })

  const {
    name,
    description,
    type,
    energy,
    size,
    environment,
    dependency,
    age,
    pictures,
    adoptionRequirements,
  } = addPetBodySchema.parse(request.body)

  const addPetUseCase = makeAddPetUseCase()

  await addPetUseCase.execute({
    name,
    description,
    type,
    energy,
    size,
    environment,
    dependency,
    age,
    pictures,
    adoptionRequirements,
    userId: request.user.sub,
  })

  return reply.status(201).send()
}