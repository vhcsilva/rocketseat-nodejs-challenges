import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Add Pet Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to add a pet', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Dog 1',
        description: 'First Dog',
        type: 'DOG',
        energy: 'HIGHEST',
        size: 'MEDIUM',
        environment: 'MEDIUM',
        dependency: 'LOW',
        age: 2,
        pictures: ['https://image.com'],
        adoptionRequirements: ['Walk the dog twice a day', 'To have kids'],
      })

    expect(response.statusCode).toEqual(201)
  })
})