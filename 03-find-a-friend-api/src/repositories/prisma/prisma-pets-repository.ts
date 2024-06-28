import { Pet } from '@/domain/pet'
import { prisma } from '@/lib/prisma'
import { AddPetData, PetsRepository, SearchManyQuery } from '@/repositories/pets-repository'
import { Prisma } from '@prisma/client'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: AddPetData) {
    const { adoptionRequirements, userId, ...rest } = data

    const pet = await prisma.pet.create({
      data: {
        ...rest,
        adoption_requirements: adoptionRequirements,
        user_id: userId,
      },
    })

    return {
      ...pet,
      adoptionRequirements: pet.adoption_requirements,
      userId: pet.user_id,
    }
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    if (!pet) return null

    return {
      ...pet,
      adoptionRequirements: pet.adoption_requirements,
      userId: pet.user_id,
    }
  }

  async findManyByUsersIds(usersIds: string[]) {
    const pets = await prisma.pet.findMany({
      where: {
        user_id: {
          in: usersIds
        },
      },
    })

    return pets.map(pet => ({
      ...pet,
      adoptionRequirements: pet.adoption_requirements,
      userId: pet.user_id,
    }))
  }

  async searchMany(query: SearchManyQuery) {
    const { usersIds, type, dependency, energy, environment, size } = query
    let where: Prisma.PetWhereInput = {}

    if (usersIds)
      where.user_id = {
        in: usersIds
      }

      if (type)
        where.type = type

      if (dependency)
        where.dependency = dependency

      if (energy)
        where.energy = energy

      if (environment)
        where.environment = environment

      if (size)
        where.size = size

    const pets = await prisma.pet.findMany({
      where,
    })

    return pets.map(pet => ({
      ...pet,
      adoptionRequirements: pet.adoption_requirements,
      userId: pet.user_id,
    }))
  }

}