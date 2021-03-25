import Specification from '../../entities/Specification'
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from '../ISpecificationsRepository'

export default class SpecificationsRepository
  implements ISpecificationsRepository {
  private static INSTANCE: SpecificationsRepository

  private specifications: Specification[]

  constructor() {
    this.specifications = []
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE ||= new SpecificationsRepository()
    }
    return SpecificationsRepository.INSTANCE
  }

  list(): Specification[] {
    return this.specifications
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification()

    Object.assign(specification, { name, description })

    this.specifications.push(specification)
  }

  findByName(name: string): Specification | undefined {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    )

    return specification
  }
}
