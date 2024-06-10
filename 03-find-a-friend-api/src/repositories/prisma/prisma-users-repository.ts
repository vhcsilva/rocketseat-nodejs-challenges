import { User } from '@/domain/user'
import { CreateUserData, UsersRepository } from '@/repositories/users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: CreateUserData): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findManyByCity(city: string): Promise<User[]> {
    const user = prisma.user.findMany({
      where: {
        city,
      },
    })

    return user
  }

}