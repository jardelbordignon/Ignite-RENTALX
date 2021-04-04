import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { AppError } from '@/shared/errors/AppError'

import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

dayjs.extend(utc)

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}
  async execute(data: IRequest): Promise<Rental> {
    const minRentalHours = 24

    const openedRentalByCar = await this.rentalsRepository.findOpenedRentalByCar(
      data.car_id
    )

    if (openedRentalByCar) throw new AppError('Car is unavailable')

    const openedRentalByUser = await this.rentalsRepository.findOpenedRentalByUser(
      data.user_id
    )

    if (openedRentalByUser) throw new AppError("There's a rental in progress")

    const expected_return_date_utc = dayjs(data.expected_return_date)
      .utc()
      .local()
      .format()

    const date_now_utc = dayjs().utc().local().format()

    const compare = dayjs(expected_return_date_utc).diff(date_now_utc, 'hours')

    if (compare < minRentalHours)
      throw new AppError(`Minimun rental hours must be ${minRentalHours}`)

    const rental = await this.rentalsRepository.save(data)

    return rental
  }
}
