import dayjs from 'dayjs'

import { CarsRepositoryInMemory } from '@/modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { DayjsDateProvider } from '@/shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { AppError } from '@/shared/errors/AppError'

import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory'
import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsProvider: DayjsDateProvider

let car_id: string

describe('CreateRentalUseCase', () => {
  const expected_return_date = dayjs().add(1, 'day').toDate()

  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dayjsProvider
    )

    const car = await carsRepositoryInMemory.save({
      name: 'Fiat 147 azul',
      description: 'motor 1.3 1982',
      daily_rate: 100,
      license_plate: 'ABC-1B34',
      fine_amount: 60,
      brand: 'Fiat',
      category_id: 'uuid-category-id',
    })

    car_id = car.id
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: 'uuid-user123',
      car_id,
      expected_return_date,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another opened to the same user', async () => {
    await createRentalUseCase.execute({
      user_id: 'uuid-user123',
      car_id,
      expected_return_date,
    })

    await expect(
      createRentalUseCase.execute({
        user_id: 'uuid-user123',
        car_id: 'another-car-id',
        expected_return_date,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress"))
  })

  it('should not be able to create a new rental if there is another opened to the same car', async () => {
    await createRentalUseCase.execute({
      user_id: 'uuid-user123',
      car_id,
      expected_return_date,
    })

    await expect(
      createRentalUseCase.execute({
        user_id: 'uuid-user124',
        car_id,
        expected_return_date,
      })
    ).rejects.toEqual(new AppError('Car is unavailable'))
  })

  it('should not be able to create a new rental whithout minimun rental hours', async () => {
    expect(async () => {
      createRentalUseCase.execute({
        user_id: 'uuid-user124',
        car_id,
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toThrowError(Error) // .toEqual(new AppError('Minimun rental hours must be 24'))
  })
})
