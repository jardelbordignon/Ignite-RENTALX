import { inject, injectable } from 'tsyringe'

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
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minRentalHours = 24

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

    return rental
  }
}
