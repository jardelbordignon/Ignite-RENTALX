import { inject, injectable } from 'tsyringe'

import { ICarsRepository } from '@/modules/cars/repositories/ICarsRepository'
import { IDateProvider } from '@/shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@/shared/errors/AppError'

import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

interface IRequest {
  id: string
  user_id: string
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const minimun_daily = 1
    const rental = await this.rentalsRepository.findById(id)

    if (!rental) throw new AppError('Rental does not exists')

    const car = await this.carsRepository.findById(rental.car_id)

    const now = this.dateProvider.dateNow()

    let daily = this.dateProvider.differenceTime(rental.start_date, now, 'days')

    if (daily < minimun_daily) daily = minimun_daily

    const delay = this.dateProvider.differenceTime(
      rental.expected_return_date,
      now,
      'days'
    )

    rental.total_daily = daily * car.daily_rate

    // if there was a delay in devolution, add the relative fine
    rental.total_fine = delay > 0 ? delay * car.fine_amount : 0

    rental.total = rental.total_fine + rental.total_daily

    rental.end_date = now

    await this.rentalsRepository.save(rental)
    await this.carsRepository.updateAvailable(car.id, true)

    return rental
  }
}
