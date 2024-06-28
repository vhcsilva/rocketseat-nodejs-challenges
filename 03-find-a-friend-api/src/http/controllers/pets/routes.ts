import { FastifyInstance } from 'fastify'

import { addPet } from '@/http/controllers/pets/add-pet'
import { getPet } from '@/http/controllers/pets/get-pet'
import { searchPets } from '@/http/controllers/pets/search-pets'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', getPet)
  app.get('/pets/search', searchPets)

  app.post('/pets', { onRequest: verifyJWT }, addPet)
}