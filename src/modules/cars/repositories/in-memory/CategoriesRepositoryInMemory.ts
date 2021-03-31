import { v4 as uuid } from 'uuid'

import Category from '@/modules/cars/entities/Category'

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository'

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = []

  async list(): Promise<Category[]> {
    return this.categories
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name)
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()
    Object.assign(category, { id: uuid(), name, description })
    this.categories.push(category)
  }
}
