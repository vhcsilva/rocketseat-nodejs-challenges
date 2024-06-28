import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance
) {
  await prisma.user.create({
    data: {
      name: 'Organization 1',
      email: 'org1@example.com',
      cep: '57300000',
      address: 'Avenida Paulista',
      state: 'SP',
      city: 'São Paulo',
      phone: '999999999',
      password_hash: await hash('123456', 6),
      role: 'ADMIN',
    },
  })

  const authResponse = await request(app.server)
    .post('/sign-in')
    .send({
      email: 'org1@example.com',
      password: '123456'
    })

  const { token } = authResponse.body

  return {
    token,
  }
}
