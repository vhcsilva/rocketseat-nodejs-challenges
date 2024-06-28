import { hash } from 'bcryptjs'

import { User } from '@/domain/user'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'

interface RegisterUseCaseInput {
  name: string
  email: string
  cep: string
  address: string
  state: string
  city: string
  phone: string
  password: string
  role: 'ADMIN' | 'ORGANIZATION' | 'USER'
}

interface RegisterUseCaseOutput {
  user: User
}

export class RegisterUseCase {
  constructor(readonly usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    cep,
    address,
    state,
    city,
    phone,
    password,
    role,
  }: RegisterUseCaseInput): Promise<RegisterUseCaseOutput> {
    const userWithEmail = await this.usersRepository.findByEmail(email)

    if (userWithEmail)
      throw new UserAlreadyExistsError()

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      cep,
      address,
      state,
      city,
      phone,
      password_hash,
      role
    })

    return { user }
  }
} 