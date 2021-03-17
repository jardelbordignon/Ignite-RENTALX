import { Category, ICreateCategoryDTO } from '../model/Category'

export default interface ICategoriesRepository {
  list(): Category[]
  findByName(name: string): Category
  create({ name, description }: ICreateCategoryDTO): void
}
