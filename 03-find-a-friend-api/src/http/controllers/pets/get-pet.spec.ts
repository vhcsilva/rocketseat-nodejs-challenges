import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Get Pet Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to get a pet', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const addResponse = await request(app.server)
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

    const getResponse = await request(app.server)
      .get(`/pets/${addResponse.body.pet.id}`)
      .send()

    expect(getResponse.statusCode).toEqual(200)
    expect(getResponse.body.pet).toEqual(expect.objectContaining({
      id: addResponse.body.pet.id
    }))
  })
})