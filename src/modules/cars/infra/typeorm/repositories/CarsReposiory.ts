import { getRepository, Repository } from 'typeorm'

import { Car } from '@/modules/cars/infra/typeorm/entities/Car'
import {
  ICarsRepository,
  ISaveCarDTO,
} from '@/modules/cars/repositories/ICarsRepository'

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async findById(id: string): Promise<Car> {
    return this.repository.findOne(id)
  }

  async save(data: ISaveCarDTO): Promise<Car> {
    const car = this.repository.create(data)
    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate })
  }

  async findAllAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const query = await this.repository.createQueryBuilder('c')

    query.where('available = :available', { available: true })

    if (category_id) {
      query.andWhere('category_id = :category_id', { category_id })
    }
    if (brand) {
      query.andWhere('brand = :brand', { brand })
    }
    if (name) {
      query.andWhere('name = :name', { name })
    }

    return query.getMany()
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id })
      .execute()
  }
}
