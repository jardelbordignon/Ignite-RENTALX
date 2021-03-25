import Category from '../../entities/Category'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository'

export default class CategoriesRepository implements ICategoriesRepository {
  private static INSTANCE: CategoriesRepository

  private categories: Category[]

  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE ||= new CategoriesRepository()
    }
    return CategoriesRepository.INSTANCE
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category()

    Object.assign(category, { name, description })

    this.categories.push(category)
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string): Category | undefined {
    const category = this.categories.find((c) => c.name === name)
    return category
  }
}
