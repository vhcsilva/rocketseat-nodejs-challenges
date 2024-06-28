import { randomUUID } from 'node:crypto'

import { Pet } from '@/domain/pet'
import { AddPetData, PetsRepository, SearchManyQuery } from '@/repositories/pets-repository'

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

  async searchMany(query: SearchManyQuery) {
    const pets = this.items.filter(pet => {
      const belongsToUsersIds = query.usersIds.includes(pet.userId)
      const isConditionsTrue = [
        query.dependency ? query.dependency === pet.dependency : true,
        query.energy ? query.energy === pet.energy : true,
        query.environment ? query.environment === pet.environment : true,
        query.size ? query.size === pet.size : true,
        query.type ? query.type === pet.type : true,
      ].every(c => c)

      return query.usersIds.includes(pet.userId) && isConditionsTrue
    })

    return pets
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