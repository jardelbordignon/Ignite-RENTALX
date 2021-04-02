import { v4 as uuid } from 'uuid'

import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository, ICreateCarDTO } from '../ICarsRepository'

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

  async findAllAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const filteredCars = this.cars
      .filter((car) => car.available)
      .filter((car) => {
        if (category_id || brand || name) {
          if (
            (category_id && car.category_id === category_id) ||
            (brand && car.brand === brand) ||
            (name && car.name === name)
          ) {
            return car
          }
          return null
        }
        return car
      })

    return filteredCars
  }
}
