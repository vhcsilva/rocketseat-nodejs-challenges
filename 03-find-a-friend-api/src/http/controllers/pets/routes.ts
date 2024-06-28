import { FastifyInstance } from 'fastify'

import { addPet } from '@/http/controllers/pets/add-pet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: verifyJWT }, addPet)
}