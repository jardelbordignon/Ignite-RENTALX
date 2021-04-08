import { Rental } from '../infra/typeorm/entities/Rental'

export interface ISaveRentalDTO {
  id?: string
  user_id: string
  car_id: string
  expected_return_date: Date
  end_date?: Date
  total_daily?: number
  total_fine?: number
  total?: number
}

export interface IRentalsRepository {
  findById(id: string): Promise<Rental>
  findOpenedRentalByCar(car_id: string): Promise<Rental>
  findOpenedRentalByUser(user_id: string): Promise<Rental>
  findAllByUser(user_id: string): Promise<Rental[]>
  save(data: ISaveRentalDTO): Promise<Rental>
}
