import { getRepository, Repository } from 'typeorm'

import {
  ICarsImagesRepository,
  ISaveCarImageDTO,
} from '@/modules/cars/repositories/ICarsImagesRepository'

import { CarImage } from '../entities/CarImage'

export class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = getRepository(CarImage)
  }

  async save(carImageData: ISaveCarImageDTO): Promise<CarImage> {
    console.log(carImageData)

    const carImage = this.repository.create(carImageData)

    await this.repository.save(carImage)

    return carImage
  }

  async findByCarId(car_id: string): Promise<CarImage[]> {
    return this.repository.find({ where: { car_id } })
  }

  async destroy(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
