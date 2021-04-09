import { CategoriesRepositoryInMemory } from '@/modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'
import { AppError } from '@/shared/errors/AppError'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory
let createCategoryUseCase: CreateCategoryUseCase

describe('CreateCategoryUseCase', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )
  })

  it('Should be able to create a new category', async () => {
    const category = {
      name: 'Category name test',
      description: 'Category description test',
    }

    await createCategoryUseCase.execute(category)

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      category.name
    )

    expect(createdCategory).toHaveProperty('id')
  })

  it('Should not be able to create a new category with exists name', async () => {
    const category = {
      name: 'Category name test',
      description: 'Category description test',
    }

    await createCategoryUseCase.execute(category)

    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError(`Category ${category.name} already exists`)
    )
  })
})
