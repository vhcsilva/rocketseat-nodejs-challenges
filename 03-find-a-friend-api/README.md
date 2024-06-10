# Find a Friend API

## Functional Requirements

- [x] Should be possible to register a pet
- [ ] Should be possible to list all pets available for adoption within a city
- [ ] Should be possible to search for pets by its characteristics
- [ ] Should be possible to view the details of a pet
- [x] Should be possible to register as a organization
- [x] Should be possible to login as a organization

## Business Rules

- [ ] To list pets, a city must be informed
- [x] A organization must have a address and a whatsapp contact
- [x] A pet must be related to a organization
- [ ] Only the city filter is required, other filters are optional
- [ ] In order to a organization to access the application as admin, it must be logged in

## Entities
- Pet:
  - name: string
  - description: string
  - type: dog, cat
  - energy: 1, 2, 3, 4, 5
  - size: small, mid, large
  - environment: small, mid, large
  - dependency: low, medium, high
  - age: number
  - pictures: string[]
  - adoptionRequirements: string[]

- User:
  - name: string
  - email: string
  - cep: string
  - address: string
  - state: string
  - city: string
  - phone: string
  - password: string
  - role: ADMIN | ORGANIZATION | USER