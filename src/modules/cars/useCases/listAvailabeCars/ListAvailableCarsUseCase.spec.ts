import { CarsRepositoryInMemory } from '@/modules/cars/repositories/in-memory/CarsRepositoryInMemory'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('ListCarsUseCase', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    )
  })

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test 1',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1B35',
      fine_amount: 80,
      brand: 'Car-brand',
      category_id: 'uuid-category-id',
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test 2',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1B36',
      fine_amount: 80,
      brand: 'Car-brand',
      category_id: 'uuid-category-id',
    })

    const cars = await listAvailableCarsUseCase.execute({ name: 'Car test 2' })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test 3',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1B37',
      fine_amount: 80,
      brand: 'Car-brand-test',
      category_id: 'uuid-category-id',
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car-brand-test',
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test 3',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1B37',
      fine_amount: 80,
      brand: 'Car-brand-test',
      category_id: 'uuid-category-1234',
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'uuid-category-1234',
    })

    expect(cars).toEqual([car])
  })
})
