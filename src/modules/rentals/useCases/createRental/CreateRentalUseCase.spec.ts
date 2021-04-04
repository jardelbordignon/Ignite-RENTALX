import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory'
import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase
let rentalRepositoryInMemory: RentalsRepositoryInMemory

describe('CreateRentalUseCase', () => {
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory)
  })

  it('should be able to create a new rental', async () => {
    await createRentalUseCase.execute({
      user_id: 'uuid-user123',
      car_id: 'uuid-car123',
      expected_return_date: new Date(),
    })
  })
})
