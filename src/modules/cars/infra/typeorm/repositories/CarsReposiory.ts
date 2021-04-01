import { getRepository, Repository } from 'typeorm'

import { Car } from '@/modules/cars/infra/typeorm/entities/Car'
import {
  ICarsRepository,
  ICreateCarDTO,
} from '@/modules/cars/repositories/ICarsRepository'

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data)
    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate })
  }
}
