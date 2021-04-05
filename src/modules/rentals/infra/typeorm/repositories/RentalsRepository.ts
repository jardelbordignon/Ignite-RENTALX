import { getRepository, Repository } from 'typeorm'

import {
  IRentalsRepository,
  ISaveRentalDTO,
} from '@/modules/rentals/repositories/IRentalsRepository'

import { Rental } from '../entities/Rental'

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findOpenedRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ car_id })
  }

  async findOpenedRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({ user_id })
  }

  async save(data: ISaveRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data)
    await this.repository.save(rental)

    return rental
  }
}
