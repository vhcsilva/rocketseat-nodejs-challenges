import { Pet } from '@/domain/pet'

export interface AddPetData {
  name: string
  description: string
  type: 'DOG' | 'CAT'
  energy: 1 | 2 | 3 | 4 | 5
  size: 'SMALL' | 'MID' | 'LARGE'
  environment: 'SMALL' | 'MID' | 'LARGE'
  dependency: 'LOW' | 'MEDIUM' | 'HIGH'
  age: number
  pictures: string[]
  adoptionRequirements: string[]
  userId: string
}

export interface SearchManyQuery {
  usersIds: string[]
  type?: 'DOG' | 'CAT' | null
  energy?: 1 | 2 | 3 | 4 | 5 | null
  size?: 'SMALL' | 'MID' | 'LARGE' | null
  environment?: 'SMALL' | 'MID' | 'LARGE' | null
  dependency?: 'LOW' | 'MEDIUM' | 'HIGH' | null
}

export interface PetsRepository {
  create(data: AddPetData): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByUsersIds(usersIds: string[]): Promise<Pet[]>
  searchMany(query: SearchManyQuery): Promise<Pet[]>
}