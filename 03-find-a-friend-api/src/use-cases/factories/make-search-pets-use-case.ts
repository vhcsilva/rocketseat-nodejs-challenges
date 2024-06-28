import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { SearchPetsUseCase } from '@/use-cases/search-pets'

export function makeSearchPetsUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const petsRepository = new PrismaPetsRepository()
  const searchPetsUseCase = new SearchPetsUseCase(usersRepository, petsRepository)

  return searchPetsUseCase
}