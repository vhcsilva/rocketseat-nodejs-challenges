export interface User {
  id: string
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