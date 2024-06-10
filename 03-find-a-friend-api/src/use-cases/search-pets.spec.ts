import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { SearchPetsUseCase } from '@/use-cases/search-pets'

let usersRepository: InMemoryUsersRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(usersRepository, petsRepository)
  })

  it('Should be able to search pets by city and characteristics', async () => {
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

    await petsRepository.create({
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

    await petsRepository.create({
      name: 'Tom',
      description: 'A cat',
      type: 'CAT',
      energy: 2,
      size: 'SMALL',
      environment: 'SMALL',
      dependency: 'LOW',
      age: 3,
      pictures: ['picture1.png'],
      adoptionRequirements: ['Requirement 1'],
      userId: user.id
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      type: 'DOG'
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Shakira'
      })
    ])
  })
})