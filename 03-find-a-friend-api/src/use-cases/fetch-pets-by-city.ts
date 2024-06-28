import { Pet } from '@/domain/pet'
import { PetsRepository } from '@/repositories/pets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface FetchPetsByCityInput {
  city: string
}

interface FetchPetsByCityOutput {
  pets: Pet[]
}

export class FetchPetsByCity {
  constructor(readonly usersRepository: UsersRepository, readonly petsRepository: PetsRepository) {}

  async execute({ city }: FetchPetsByCityInput): Promise<FetchPetsByCityOutput> {
    const users = await this.usersRepository.findManyByCity(city)

    if (!users.length)
      throw new ResourceNotFoundError()

    const usersIds = users.map(user => user.id)
    const pets = await this.petsRepository.findManyByUsersIds(usersIds)

    return { pets }
  }
}