import { Pet } from '@/domain/pet'
import { PetsRepository } from '@/repositories/pets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface SearchPetsUseCaseInput {
  city: string,
  type?: 'DOG' | 'CAT' | null
  energy?: 'LOWEST' | 'LOW' | 'REGULAR' | 'HIGH' | 'HIGHEST' | null
  size?: 'SMALL' | 'MEDIUM' | 'LARGE' | null
  environment?: 'SMALL' | 'MEDIUM' | 'LARGE' | null
  dependency?: 'LOW' | 'MEDIUM' | 'HIGH' | null
}

interface SearchPetsUseCaseOutput {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(readonly usersRepository: UsersRepository, readonly petsRepository: PetsRepository) {}

  async execute({
    city,
    type,
    energy,
    size,
    environment,
    dependency
  }: SearchPetsUseCaseInput): Promise<SearchPetsUseCaseOutput> {
    const users = await this.usersRepository.findManyByCity(city)

    if (!users.length)
      throw new ResourceNotFoundError()

    const usersIds = users.map(user => user.id)
    const pets = await this.petsRepository.searchMany({
      usersIds,
      type,
      energy,
      size,
      environment,
      dependency,
    })

    return { pets }
  }
}