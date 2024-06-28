import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Register Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register', async () => {
    const response = await request(app.server)
      .post('/register')
      .send({
        name: 'Organization 1',
        email: 'org1@example.com',
        cep: '57300000',
        address: 'Avenida Paulista',
        state: 'SP',
        city: 'São Paulo',
        phone: '999999999',
        password: '123456'
      })

    expect(response.statusCode).toBe(201)
  })
})