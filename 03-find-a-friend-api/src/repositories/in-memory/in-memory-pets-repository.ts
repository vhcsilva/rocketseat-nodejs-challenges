import { randomUUID } from 'node:crypto'

import { Pet } from '@/domain/pet'
import { AddPetData, PetsRepository } from '@/repositories/pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find(pet => pet.id === id)

    if (!pet)
      return null

    return pet
  }

  async findManyByUsersIds(usersIds: string[]) {
    return this.items.filter(item => usersIds.includes(item.userId))
  }

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