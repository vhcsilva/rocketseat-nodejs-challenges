import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AddPetUseCase } from '@/use-cases/add-pet'

export function makeAddPetUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const petsRepository = new PrismaPetsRepository()
  const addPetUseCase = new AddPetUseCase(usersRepository, petsRepository)

  return addPetUseCase
}