import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Sign In Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to sign in', async () => {
    await request(app.server)
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

    const response = await request(app.server)
      .post('/sign-in')
      .send({
        email: 'org1@example.com',
        password: '123456'
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})