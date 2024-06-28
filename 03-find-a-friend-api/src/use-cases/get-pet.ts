import { Pet } from '@/domain/pet'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface GetPetUseCaseInput {
  petId: string
}

interface GetPetUseCaseOutput {
  pet: Pet
}

export class GetPetUseCase {
  constructor(readonly petsRepository: PetsRepository) {}

  async execute({ petId }: GetPetUseCaseInput): Promise<GetPetUseCaseOutput> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet)
      throw new ResourceNotFoundError()

    return { pet }
  }
}