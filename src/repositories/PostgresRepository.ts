import { Category, ICreateCategoryDTO } from '../model/Category'
import ICategoriesRepository from './ICategoriesRepository'

export default class PostgresRepository implements ICategoriesRepository {
  findByName(name: string): Category {
    console.log(name)
    return null
  }

  list(): Category[] {
    return null
  }

  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description)
  }
}
