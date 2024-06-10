import { User } from '@/domain/user'

export interface CreateUserData {
  name: string
  email: string
  cep: string
  address: string
  state: string
  city: string
  phone: string
  password_hash: string
  role: 'ADMIN' | 'ORGANIZATION' | 'USER'
}

export interface UsersRepository {
  create: (data: CreateUserData) => Promise<User>
  findById: (id: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
}