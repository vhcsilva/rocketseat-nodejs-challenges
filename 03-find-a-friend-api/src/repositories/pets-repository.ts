import { Pet } from '@/domain/pet'

export interface AddPetData {
  name: string
  description: string
  type: 'DOG' | 'CAT'
  energy: 'LOWEST' | 'LOW' | 'REGULAR' | 'HIGH' | 'HIGHEST'
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  environment: 'SMALL' | 'MEDIUM' | 'LARGE'
  dependency: 'LOW' | 'MEDIUM' | 'HIGH'
  age: number
  pictures: string[]
  adoptionRequirements: string[]
  userId: string
}

export interface SearchManyQuery {
  usersIds: string[]
  type?: 'DOG' | 'CAT' | null
  energy?: 'LOWEST' | 'LOW' | 'REGULAR' | 'HIGH' | 'HIGHEST' | null
  size?: 'SMALL' | 'MEDIUM' | 'LARGE' | null
  environment?: 'SMALL' | 'MEDIUM' | 'LARGE' | null
  dependency?: 'LOW' | 'MEDIUM' | 'HIGH' | null
}

export interface PetsRepository {
  create(data: AddPetData): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByUsersIds(usersIds: string[]): Promise<Pet[]>
  searchMany(query: SearchManyQuery): Promise<Pet[]>
}