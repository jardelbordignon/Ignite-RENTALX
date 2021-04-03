import { inject, injectable } from 'tsyringe'

import { AppError } from '@/shared/errors/AppError'

import { Car } from '../../infra/typeorm/entities/Car'
import {
  ICarsRepository,
  ISaveCarDTO,
} from '../../repositories/ICarsRepository'

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(data: ISaveCarDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      data.license_plate
    )

    if (carAlreadyExists) throw new AppError('Car already exists')

    const car = await this.carsRepository.save(data)

    return car
  }
}
