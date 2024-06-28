import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('Should be able to authenticate a user', async () => {
    await usersRepository.create({
      name: 'Organization 1',
      email: 'org1@example.com',
      cep: '57300-000',
      address: 'Avenida Paulista',
      state: 'São Paulo',
      city: 'São Paulo',
      phone: '999999999',
      password_hash: await hash('123456', 6),
      role: 'ORGANIZATION',
    })

    const { user } = await sut.execute({
      email: 'org1@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with invalid email', async () => {
    await expect(sut.execute({
      email: 'org1@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with invalid password', async () => {
    await usersRepository.create({
      name: 'Organization 1',
      email: 'org1@example.com',
      cep: '57300-000',
      address: 'Avenida Paulista',
      state: 'São Paulo',
      city: 'São Paulo',
      phone: '999999999',
      password_hash: await hash('123456', 6),
      role: 'ORGANIZATION',
    })

    await expect(sut.execute({
      email: 'org1@example.com',
      password: 'invalid'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})