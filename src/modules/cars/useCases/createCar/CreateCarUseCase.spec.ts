import { AppError } from '@/shared/errors/AppError'

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
    const car = await createCarUseCase.execute({
      name: 'Uno preto 1991',
      description: 'Uno BRIO 1.0 básico preto 1991',
      daily_rate: 40,
      license_plate: 'ABC-1234',
      fine_amount: 30,
      brand: 'Fiat',
      category_id: 'uuid-xxxx',
    })

    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a new car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Uno preto 1991',
      description: 'Uno BRIO 1.0 básico preto 1991',
      daily_rate: 40,
      license_plate: 'ABC-1234',
      fine_amount: 30,
      brand: 'Fiat',
      category_id: 'uuid-xxxx',
    })

    await expect(
      createCarUseCase.execute({
        name: 'Fiat 147 branco 1983',
        description: 'Fiat 147 Europa 1.3 1983 - Ar quente',
        daily_rate: 50,
        license_plate: 'ABC-1234',
        fine_amount: 30,
        brand: 'Fiat',
        category_id: 'uuid-xxxx-123',
      })
    ).rejects.toEqual(new AppError(`Car already exists`))
  })

  it('should to create a new car with available true', async () => {
    const car = await createCarUseCase.execute({
      name: 'Uno preto 1991',
      description: 'Uno BRIO 1.0 básico preto 1991',
      daily_rate: 40,
      license_plate: 'ABC-1234',
      fine_amount: 30,
      brand: 'Fiat',
      category_id: 'uuid-xxxx',
    })

    expect(car.available).toBe(true)
  })
})
