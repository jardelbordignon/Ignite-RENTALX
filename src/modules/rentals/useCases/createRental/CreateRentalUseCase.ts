import { inject, injectable } from 'tsyringe'

import { ICarsRepository } from '@/modules/cars/repositories/ICarsRepository'
import { IDateProvider } from '@/shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@/shared/errors/AppError'

import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minRentalHours = 24

    const carExists = await this.carsRepository.findById(car_id)
    if (!carExists) throw new AppError('This car not exists')

    const openedRentalByCar = await this.rentalsRepository.findOpenedRentalByCar(
      car_id
    )
    if (openedRentalByCar) throw new AppError('Car is unavailable')

    const openedRentalByUser = await this.rentalsRepository.findOpenedRentalByUser(
      user_id
    )
    if (openedRentalByUser) throw new AppError("There's a rental in progress")

    const now = this.dateProvider.dateNow()

    const compare = this.dateProvider.differenceInHours(
      now,
      expected_return_date
    )

    if (compare < minRentalHours)
      throw new AppError(`Minimun rental hours must be ${minRentalHours}`)

    const rental = await this.rentalsRepository.save({
      car_id,
      user_id,
      expected_return_date,
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }
}
