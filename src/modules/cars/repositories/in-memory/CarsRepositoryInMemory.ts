import { v4 as uuid } from 'uuid'

import { ICreateCarDTO } from '../../dtos/ICreateCarDTO'
import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../ICarsRepository'

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async create(carData: ICreateCarDTO): Promise<Car> {
    const car = new Car()
    Object.assign(car, {
      id: uuid(),
      ...carData,
      available: true,
      create_at: new Date(),
      update_at: new Date(),
    })
    this.cars.push(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate)
  }
}
