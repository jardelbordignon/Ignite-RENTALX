import Category from '../model/Category'

interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategoriesRepository {
  list(): Category[]
  findByName(name: string): Category
  create({ name, description }: ICreateCategoryDTO): void
}

export { ICategoriesRepository, ICreateCategoryDTO }
