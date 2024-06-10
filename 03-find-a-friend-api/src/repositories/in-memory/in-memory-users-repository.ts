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

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(user => user.email === email)

    if (!user)
      return null

    return user
  }

}