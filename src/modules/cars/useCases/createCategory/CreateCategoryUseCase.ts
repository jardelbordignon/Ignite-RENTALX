import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../../repositories/ICategoriesRepository'

export default class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const existsCategory = await this.categoriesRepository.findByName(name)

    if (existsCategory) {
      throw new Error(`Category ${name} already exists`)
    }

    this.categoriesRepository.create({ name, description })
  }
}
