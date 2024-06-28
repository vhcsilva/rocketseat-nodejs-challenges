import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Fetch Pets by City Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to fetch pets by city', async () => {
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
      .get('/pets/fetch-by-city')
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