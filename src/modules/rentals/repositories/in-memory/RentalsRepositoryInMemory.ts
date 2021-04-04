import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '../IRentalsRepository'

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = []

  async findOpenedRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    )
  }

  async findOpenedRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    )
  }
}
