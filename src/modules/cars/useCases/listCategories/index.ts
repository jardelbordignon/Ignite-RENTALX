import CategoriesRepository from '../../repositories/CategoriesRepository'
import ListCategoriesController from './ListCategoriesController'
import ListCategoriesUseCase from './ListCategoriesUseCase'

const categoriesRepository = new CategoriesRepository()
const listCategoriesuseCase = new ListCategoriesUseCase(categoriesRepository)
const listCategoriesController = new ListCategoriesController(
  listCategoriesuseCase
)

export { listCategoriesController }
