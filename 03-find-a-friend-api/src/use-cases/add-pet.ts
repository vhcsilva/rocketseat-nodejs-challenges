import { Pet } from '@/domain/pet'
import { PetsRepository } from '@/repositories/pets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface AddPetUseCaseInput {
  name: string
  description: string
  type: 'DOG' | 'CAT'
  energy: 'LOWEST' | 'LOW' | 'REGULAR' | 'HIGH' | 'HIGHEST'
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  environment: 'SMALL' | 'MEDIUM' | 'LARGE'
  dependency: 'LOW' | 'MEDIUM' | 'HIGH'
  age: number
  pictures: string[]
  adoptionRequirements: string[]
  userId: string
}

interface AddPetUseCaseOutput {
  pet: Pet
}

export class AddPetUseCase {
  constructor(readonly usersRepository: UsersRepository, readonly petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    type,
    energy,
    size,
    environment,
    dependency,
    age,
    pictures,
    adoptionRequirements,
    userId,
  }: AddPetUseCaseInput): Promise<AddPetUseCaseOutput> {
    const user = await this.usersRepository.findById(userId)

    if (!user)
      throw new ResourceNotFoundError()

    const pet = await this.petsRepository.create({
      name,
      description,
      type,
      energy,
      size,
      environment,
      dependency,
      age,
      pictures,
      adoptionRequirements,
      userId
    })

    return { pet }
  }
}