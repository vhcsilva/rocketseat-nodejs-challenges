import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Seach Pets Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to search pets', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
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

    const searchResponse = await request(app.server)
      .get('/pets/search')
      .query({
        city: 'São Paulo'
      })
      .send()

    expect(searchResponse.statusCode).toEqual(200)
    expect(searchResponse.body.pets).toHaveLength(1)
    expect(searchResponse.body.pets).toEqual([
      expect.objectContaining({
        name: 'Dog 1'
      })
    ])
  })
})