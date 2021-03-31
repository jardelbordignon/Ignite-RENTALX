import { v4 as uuid } from 'uuid'

import { ICreateCarDTO } from '../../dtos/ICreateCarDTO'
import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../ICarsRepository'

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async create(carData: ICreateCarDTO): Promise<void> {
    const car = new Car()
    Object.assign(car, { id: uuid(), ...carData })
    this.cars.push(car)
  }
}
