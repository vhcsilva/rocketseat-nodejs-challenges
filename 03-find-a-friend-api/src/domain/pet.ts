export interface Pet {
  id: string
  name: string
  description: string
  type: 'DOG' | 'CAT'
  energy:  'LOWEST' | 'LOW' | 'REGULAR' | 'HIGH' | 'HIGHEST'
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  environment: 'SMALL' | 'MEDIUM' | 'LARGE'
  dependency: 'LOW' | 'MEDIUM' | 'HIGH'
  age: number
  pictures: string[]
  adoptionRequirements: string[]
  userId: string
}