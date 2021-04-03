import { AppError } from '@/shared/errors/AppError'

import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationsRepositoryInMemory } from '../../repositories/in-memory/SpecificationsRepositoryInMemory'
import { CreateCarSpecificationUseCase } from './createCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('CreateCarSpecificationUseCase', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    )
  })

  it('should not be able to add a new specification to a non-existent car', async () => {
    const car_id = 'uuid-123'
    const specifications_id = ['uuid-234', 'uuid-345', 'uuid-456']

    await expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_id })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.save({
      name: 'Uno preto 1991',
      description: 'Uno BRIO 1.0 básico preto 1991',
      daily_rate: 40,
      license_plate: 'ABC-1234',
      fine_amount: 30,
      brand: 'Fiat',
      category_id: 'uuid-xxxx',
    })

    const specification1 = await specificationsRepositoryInMemory.create({
      name: 'specification 1',
      description: 'specification 1',
    })

    const specification2 = await specificationsRepositoryInMemory.create({
      name: 'specification 2',
      description: 'specification 2',
    })

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification1.id, specification2.id],
    })

    expect(specificationsCar.specifications.length).toBe(2)
  })
})
