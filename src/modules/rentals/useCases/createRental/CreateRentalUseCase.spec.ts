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

describe('CreateRentalUseCase', () => {
  const expected_return_date = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dayjsProvider
    )
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: 'uuid-user123',
      car_id: 'uuid-car123',
      expected_return_date,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another opened to the same user', async () => {
    await createRentalUseCase.execute({
      user_id: 'uuid-user123',
      car_id: 'uuid-car123',
      expected_return_date,
    })

    await expect(
      createRentalUseCase.execute({
        user_id: 'uuid-user123',
        car_id: 'uuid-car124',
        expected_return_date,
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental if there is another opened to the same car', async () => {
    await createRentalUseCase.execute({
      user_id: 'uuid-user123',
      car_id: 'uuid-car123',
      expected_return_date,
    })

    await expect(
      createRentalUseCase.execute({
        user_id: 'uuid-user124',
        car_id: 'uuid-car123',
        expected_return_date,
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental whithout minimun rental hours', async () => {
    expect(async () => {
      createRentalUseCase.execute({
        user_id: 'uuid-user124',
        car_id: 'uuid-car123',
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
