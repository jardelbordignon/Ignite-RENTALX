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

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne(id)
  }

  async findOpenedRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { car_id, end_date: null } })
  }

  async findOpenedRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { user_id, end_date: null } })
  }

  async findAllByUser(user_id: string): Promise<Rental[]> {
    return this.repository.find({ user_id })
  }

  async save(data: ISaveRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data)
    await this.repository.save(rental)

    return rental
  }
}
