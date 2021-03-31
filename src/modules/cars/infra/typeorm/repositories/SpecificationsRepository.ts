import { getRepository, Repository } from 'typeorm'

import Specification from '@/modules/cars/infra/typeorm/entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '@/modules/cars/repositories/ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async list(): Promise<Specification[]> {
    return this.repository.find()
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description })
    await this.repository.save(specification)
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.repository.findOne({ name })
    return specification
  }
}
