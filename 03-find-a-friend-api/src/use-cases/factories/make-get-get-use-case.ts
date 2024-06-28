import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '@/use-cases/get-pet'

export function makeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getPetUseCase = new GetPetUseCase(petsRepository)

  return getPetUseCase
}