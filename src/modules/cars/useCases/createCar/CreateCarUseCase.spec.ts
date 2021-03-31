import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('CreateCarUseCase', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'Uno preto 1991',
      description: 'Uno BRIO 1.0 básico preto 1991',
      daily_rate: 40,
      license_plate: 'ABC-1234',
      fine_amount: 30,
      brand: 'Fiat',
      category_id: 'uuid-xxxx',
    })
  })
})
