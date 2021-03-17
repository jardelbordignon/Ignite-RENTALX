import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../../repositories/ISpecificationsRepository'

export default class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: ICreateSpecificationDTO): void {
    const existsSpecification = this.specificationsRepository.findByName(name)

    if (existsSpecification) {
      throw new Error(`Specification ${name} already exists`)
    }

    this.specificationsRepository.create({ name, description })
  }
}
