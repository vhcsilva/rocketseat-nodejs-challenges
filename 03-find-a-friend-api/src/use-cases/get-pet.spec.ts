import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetUseCase } from '@/use-cases/get-pet'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('Should be able to get a pet by its id', async () => {
    const createdPet = await petsRepository.create({
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
      userId: 'user-id'
    })

    const { pet } = await sut.execute({
      petId: createdPet.id
    })

    expect(pet.id).toBe(createdPet.id)
  })

  it('Should not be able to get an invalid pet', async () => {
    await expect(() => sut.execute({
      petId: 'invalid-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})