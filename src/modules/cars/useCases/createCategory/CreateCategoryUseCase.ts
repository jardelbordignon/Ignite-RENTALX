import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../../repositories/ICategoriesRepository'

export default class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: ICreateCategoryDTO): void {
    const existsCategory = this.categoriesRepository.findByName(name)

    if (existsCategory) {
      throw new Error(`Category ${name} already exists`)
    }

    this.categoriesRepository.create({ name, description })
  }
}
