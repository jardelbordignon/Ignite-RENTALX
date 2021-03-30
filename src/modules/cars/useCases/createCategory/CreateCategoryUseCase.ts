import { inject, injectable } from 'tsyringe'

import { AppError } from '@/errors/AppError'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@/modules/cars/repositories/ICategoriesRepository'

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const existsCategory = await this.categoriesRepository.findByName(name)

    if (existsCategory) {
      throw new AppError(`Category ${name} already exists`)
    }

    this.categoriesRepository.create({ name, description })
  }
}
