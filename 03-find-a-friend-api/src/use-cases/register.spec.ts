import { beforeEach, describe, expect, it } from 'vitest'

import { RegisterUseCase } from '@/use-cases/register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('Should be able to register a organization user', async () => {
    const { user } = await sut.execute({
      name: 'Organization 1',
      email: 'org1@example.com',
      cep: '57300-000',
      address: 'Avenida Paulista',
      state: 'São Paulo',
      city: 'São Paulo',
      phone: '999999999',
      password: '123456',
      role: 'ORGANIZATION',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to register a organization user with same email', async () => {
    await sut.execute({
      name: 'Organization 1',
      email: 'org1@example.com',
      cep: '57300-000',
      address: 'Avenida Paulista',
      state: 'São Paulo',
      city: 'São Paulo',
      phone: '999999999',
      password: '123456',
      role: 'ORGANIZATION',
    })

    await expect(() => sut.execute({
      name: 'Organization 1',
      email: 'org1@example.com',
      cep: '57300-000',
      address: 'Avenida Paulista',
      state: 'São Paulo',
      city: 'São Paulo',
      phone: '999999999',
      password: '123456',
      role: 'ORGANIZATION',
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})