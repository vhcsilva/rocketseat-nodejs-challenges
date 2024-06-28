import { randomUUID } from 'node:crypto'

import { User } from '@/domain/user'
import { CreateUserData, UsersRepository } from '@/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: CreateUserData): Promise<User> {
    const id = randomUUID()

    const user = {
      ...data,
      id
    }

    this.items.push(user)

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find(user => user.id === id)

    if (!user)
      return null

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(user => user.email === email)

    if (!user)
      return null

    return user
  }

  async findManyByCity(city: string) {
    return this.items.filter(item => item.city === city)
  }

}