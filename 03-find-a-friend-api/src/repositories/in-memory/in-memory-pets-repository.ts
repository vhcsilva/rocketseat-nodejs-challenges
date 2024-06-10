import { randomUUID } from 'node:crypto'

import { Pet } from '@/domain/pet'
import { AddPetData, PetsRepository } from '@/repositories/pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: AddPetData): Promise<Pet> {
    const id = randomUUID()

    const pet = {
      ...data,
      id
    }

    this.items.push(pet)

    return pet
  }

}