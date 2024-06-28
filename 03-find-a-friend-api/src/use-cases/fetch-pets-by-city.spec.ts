import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { FetchPetsByCity } from '@/use-cases/fetch-pets-by-city'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByCity

describe('Fetch Pets by City Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCity(usersRepository, petsRepository)
  })

  it('Should be able to fetch pets by city', async () => {
    const user = await usersRepository.create({
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

    const pet = await petsRepository.create({
      name: 'Shakira',
      description: 'A dog',
      type: 'DOG',
      energy: 5,
      size: 'MID',
      environment: 'LARGE',
      dependency: 'MEDIUM',
      age: 1,
      pictures: ['picture1.png', 'picture2.png', 'picture3.png'],
      adoptionRequirements: ['Requirement 1', 'Requirement 2', 'Requirement 3'],
      userId: user.id
    })

    const { pets } = await sut.execute({
      city: 'São Paulo'
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        id: pet.id
      })
    ])
  })

  it('Should not be able to fetch pets with invalid city', async () => {
    await expect(() => sut.execute({
      city: 'Rio de Janeiro'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})