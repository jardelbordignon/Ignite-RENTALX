import { Specification } from '@/modules/cars/infra/typeorm/entities/Specification'

import { Car } from '../infra/typeorm/entities/Car'

export interface ISaveCarDTO {
  id?: string
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
  specifications?: Specification[]
}

export interface ICarsRepository {
  save(data: ISaveCarDTO): Promise<Car>
  findById(id: string): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car>
  findAllAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>
  updateAvailable(id: string, available: boolean): Promise<void>
}
