import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository, ISaveRentalDTO } from '../IRentalsRepository'

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = []

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id)
  }

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

  async findAllByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === user_id)
  }

  async save(data: ISaveRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, { ...data, start_date: new Date() })

    this.rentals.push(rental)

    return rental
  }
}
