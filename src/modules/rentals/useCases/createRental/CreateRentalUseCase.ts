import { AppError } from '@/shared/errors/AppError'

import { IRentalsRepository } from '../../repositories/IRentalsRepository'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}
  async execute(data: IRequest): Promise<void> {
    const openedRentalByCar = await this.rentalsRepository.findOpenedRentalByCar(
      data.car_id
    )

    if (openedRentalByCar) throw new AppError('Car is unavailable')

    const openedRentalByUser = await this.rentalsRepository.findOpenedRentalByUser(
      data.user_id
    )

    if (openedRentalByUser) throw new AppError("There's a rental in progress")
  }
}
