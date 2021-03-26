import { inject, injectable } from 'tsyringe'

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../../repositories/ISpecificationsRepository'

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const existsSpecification = await this.specificationsRepository.findByName(
      name
    )

    if (existsSpecification) {
      throw new Error(`Specification ${name} already exists`)
    }

    await this.specificationsRepository.create({ name, description })
  }
}
