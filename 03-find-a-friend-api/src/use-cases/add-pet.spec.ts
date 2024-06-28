import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { AddPetUseCase } from '@/use-cases/add-pet'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let petsRepository: InMemoryPetsRepository
let sut: AddPetUseCase

describe('Add Pet Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new AddPetUseCase(usersRepository, petsRepository)
  })

  it('Should be able to add a pet to a organization', async () => {
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

    const { pet } = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String))
  })

  it('Should not be able to add a pet to a invalid organization', async () => {
    await expect(() => sut.execute({
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
      userId: 'invalid'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})