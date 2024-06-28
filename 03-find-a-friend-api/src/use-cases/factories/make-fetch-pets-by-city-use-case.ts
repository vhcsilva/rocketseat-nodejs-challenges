import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FetchPetsByCity } from '@/use-cases/fetch-pets-by-city'

export function makeFetchPetsByCityUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const petsRepository = new PrismaPetsRepository()
  const fetchPetsByCityUseCase = new FetchPetsByCity(usersRepository, petsRepository)

  return fetchPetsByCityUseCase
}