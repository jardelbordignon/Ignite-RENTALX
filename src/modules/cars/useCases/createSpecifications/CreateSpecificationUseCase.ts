import { inject, injectable } from 'tsyringe'

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '@/modules/cars/repositories/ISpecificationsRepository'
import { AppError } from '@/shared/errors/AppError'

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
      throw new AppError(`Specification ${name} already exists`)
    }

    await this.specificationsRepository.create({ name, description })
  }
}
