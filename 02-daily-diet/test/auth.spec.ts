import { execSync } from 'node:child_process'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '../src/app'

describe('Authentication Route', () => {
  const userPayload = {
    name: 'John Doe',
    email: 'johndoe@email.com',
    password: 'password123',
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

  describe('Sign Up', () => {
    it('Should be able to sign up sucessfully', async () => {
      const signUpResponse = await request(app.server)
        .post('/auth/signup')
        .send(userPayload)
        .expect(200)

      expect(signUpResponse.body).toEqual({
        id: expect.any(String),
        name: userPayload.name,
        email: userPayload.email,
      })
    })

    it('Should throws because request body is invalid', async () => {
      const signUpResponse = await request(app.server)
        .post('/auth/signup')
        .send({})
        .expect(400)

      expect(signUpResponse.body).toEqual({
        error: 'Missing parameters',
      })
    })

    it('Should throws because email already exists', async () => {
      await request(app.server)
        .post('/auth/signup')
        .send(userPayload)
        .expect(200)

      const signUpResponse = await request(app.server)
        .post('/auth/signup')
        .send(userPayload)
        .expect(400)

      expect(signUpResponse.body).toEqual({
        error: 'Email already exists',
      })
    })
  })

  describe('Sign In', () => {
    it('Should be able to sign in sucessfully', async () => {
      await request(app.server).post('/auth/signup').send(userPayload)

      const signInResponse = await request(app.server)
        .post('/auth/signin')
        .send({
          email: userPayload.email,
          password: userPayload.password,
        })
        .expect(200)

      expect(
        signInResponse.get('Set-Cookie')?.find((h) => h.includes('sessionId')),
      ).toBeDefined()
    })

    it('Should throws because request body is invalid', async () => {
      await request(app.server).post('/auth/signup').send(userPayload)

      const signInResponse = await request(app.server)
        .post('/auth/signin')
        .send({})
        .expect(400)

      expect(signInResponse.body).toEqual({
        error: 'Missing parameters',
      })
    })

    it('Should throws because password is wrong', async () => {
      await request(app.server).post('/auth/signup').send(userPayload)

      const signInResponse = await request(app.server)
        .post('/auth/signin')
        .send({
          email: userPayload.email,
          password: 'wrong_password',
        })
        .expect(400)

      expect(signInResponse.body).toEqual({
        error: 'Invalid credentials',
      })
    })
  })
})
