import { User } from '@/domain/user'
import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseInput {
  email: string
  password: string
}

interface AuthenticateUseCaseOutput {
  user: User
}

export class AuthenticateUseCase {
  constructor(readonly usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUseCaseInput): Promise<AuthenticateUseCaseOutput> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user)
      throw new InvalidCredentialsError()

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches)
      throw new InvalidCredentialsError()

    return {
      user
    }
  }
}