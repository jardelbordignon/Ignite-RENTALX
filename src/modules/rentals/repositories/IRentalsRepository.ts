import { Rental } from '../infra/typeorm/entities/Rental'

export interface ISaveRentalDTO {
  id?: string
  user_id: string
  car_id: string
  expected_return_date: Date
}

export interface IRentalsRepository {
  findOpenedRentalByCar(car_id: string): Promise<Rental>
  findOpenedRentalByUser(user_id: string): Promise<Rental>
  save(data: ISaveRentalDTO): Promise<Rental>
}
