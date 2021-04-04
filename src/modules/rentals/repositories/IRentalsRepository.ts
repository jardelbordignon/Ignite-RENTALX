import { Rental } from '../infra/typeorm/entities/Rental'

export interface IRentalsRepository {
  findOpenedRentalByCar(car_id: string): Promise<Rental>
  findOpenedRentalByUser(user_id: string): Promise<Rental>
}
