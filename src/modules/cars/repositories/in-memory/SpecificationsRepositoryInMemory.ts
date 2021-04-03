import { v4 as uuid } from 'uuid'

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '@/modules/cars/repositories/ISpecificationsRepository'

import { Specification } from '../../infra/typeorm/entities/Specification'

export class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository {
  specifications: Specification[] = []

  async list(): Promise<Specification[]> {
    return this.specifications
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()
    Object.assign(specification, { id: uuid(), name, description })
    this.specifications.push(specification)

    return specification
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((spec) => spec.name === name)
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id)
    )
  }
}
