import { execSync } from 'node:child_process'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '../src/app'

describe('Meals Route', () => {
  const userPayload = {
    name: 'John Doe',
    email: 'johndoe@email.com',
    password: 'password123',
  }
  const mealPayload = {
    name: 'Coffee break',
    description: 'First meal of the day',
    diet: true,
  }

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('Should be able to create a meal', async () => {
    await request(app.server).post('/auth/signup').send(userPayload)

    const signInResponse = await request(app.server).post('/auth/signin').send({
      email: userPayload.email,
      password: userPayload.password,
    })

    const cookies = signInResponse.get('Set-Cookie')?.at(0)

    const createMealResponse = await request(app.server)
      .post('/meals')
      .send(mealPayload)
      .set('Cookie', cookies!)
      .expect(201)

    expect(createMealResponse.body).toEqual({
      id: expect.any(String),
      name: mealPayload.name,
      description: mealPayload.description,
    })
  })

  it('Should be able to get a meal', async () => {
    await request(app.server).post('/auth/signup').send(userPayload)

    const signInResponse = await request(app.server).post('/auth/signin').send({
      email: userPayload.email,
      password: userPayload.password,
    })

    const cookies = signInResponse.get('Set-Cookie')?.at(0)

    const createMealResponse = await request(app.server)
      .post('/meals')
      .send(mealPayload)
      .set('Cookie', cookies!)

    const getMealResponse = await request(app.server)
      .get(`/meals/${createMealResponse.body.id}`)
      .set('Cookie', cookies!)

    expect(getMealResponse.body).toEqual(
      expect.objectContaining({
        ...mealPayload,
        diet: 1,
        id: createMealResponse.body.id,
      }),
    )
  })

  it('Should be able to update a meal', async () => {
    await request(app.server).post('/auth/signup').send(userPayload)

    const signInResponse = await request(app.server).post('/auth/signin').send({
      email: userPayload.email,
      password: userPayload.password,
    })

    const cookies = signInResponse.get('Set-Cookie')?.at(0)

    const createMealResponse = await request(app.server)
      .post('/meals')
      .send(mealPayload)
      .set('Cookie', cookies!)
    const createdMealId = createMealResponse.body.id

    await request(app.server)
      .put(`/meals/${createdMealId}`)
      .send({
        name: 'updated name',
        description: 'updated description',
        diet: true,
      })
      .set('Cookie', cookies!)
      .expect(200)

    const getMealResponse = await request(app.server)
      .get(`/meals/${createdMealId}`)
      .set('Cookie', cookies!)

    expect(getMealResponse.body).toEqual(
      expect.objectContaining({
        description: 'updated description',
      }),
    )
  })

  it('Should be able to delete a meal', async () => {
    await request(app.server).post('/auth/signup').send(userPayload)

    const signInResponse = await request(app.server).post('/auth/signin').send({
      email: userPayload.email,
      password: userPayload.password,
    })

    const cookies = signInResponse.get('Set-Cookie')?.at(0)

    const createMealResponse = await request(app.server)
      .post('/meals')
      .send(mealPayload)
      .set('Cookie', cookies!)
    const createdMealId = createMealResponse.body.id

    await request(app.server)
      .delete(`/meals/${createdMealId}`)
      .set('Cookie', cookies!)
      .expect(200)

    await request(app.server)
      .get(`/meals/${createdMealId}`)
      .set('Cookie', cookies!)
      .expect(404)
  })

  it('Should be able to list all meals', async () => {
    await request(app.server).post('/auth/signup').send(userPayload)

    const signInResponse = await request(app.server).post('/auth/signin').send({
      email: userPayload.email,
      password: userPayload.password,
    })

    const cookies = signInResponse.get('Set-Cookie')?.at(0)

    await request(app.server)
      .post('/meals')
      .send(mealPayload)
      .set('Cookie', cookies!)

    await request(app.server)
      .post('/meals')
      .send(mealPayload)
      .set('Cookie', cookies!)

    const listMealResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies!)

    expect(listMealResponse.body).toEqual([
      expect.objectContaining({
        name: mealPayload.name,
        description: mealPayload.description,
      }),
      expect.objectContaining({
        name: mealPayload.name,
        description: mealPayload.description,
      }),
    ])
  })

  it('Should be able to get user metrics', async () => {
    await request(app.server).post('/auth/signup').send(userPayload)

    const signInResponse = await request(app.server).post('/auth/signin').send({
      email: userPayload.email,
      password: userPayload.password,
    })

    const cookies = signInResponse.get('Set-Cookie')?.at(0)

    await request(app.server)
      .post('/meals')
      .send(mealPayload)
      .set('Cookie', cookies!)

    await request(app.server)
      .post('/meals')
      .send(mealPayload)
      .set('Cookie', cookies!)

    await request(app.server)
      .post('/meals')
      .send(mealPayload)
      .set('Cookie', cookies!)

    await request(app.server)
      .post('/meals')
      .send({
        ...mealPayload,
        diet: false,
      })
      .set('Cookie', cookies!)

    await request(app.server)
      .post('/meals')
      .send(mealPayload)
      .set('Cookie', cookies!)

    const getMetricsResponse = await request(app.server)
      .get('/meals/metrics')
      .set('Cookie', cookies!)

    expect(getMetricsResponse.body).toEqual({
      total: 5,
      totalOnDiet: 4,
      totalOutDiet: 1,
      bestSequence: 3,
    })
  })
})
