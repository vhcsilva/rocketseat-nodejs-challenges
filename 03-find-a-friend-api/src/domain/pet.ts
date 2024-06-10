export interface Pet {
  id: string
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