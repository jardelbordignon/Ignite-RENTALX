import CategoriesRepository from '../../repositories/implementations/CategoriesRepository'
import ListCategoriesController from './ListCategoriesController'
import ListCategoriesUseCase from './ListCategoriesUseCase'

const categoriesRepository = null // new CategoriesRepository()
const listCategoriesuseCase = new ListCategoriesUseCase(categoriesRepository)
const listCategoriesController = new ListCategoriesController(
  listCategoriesuseCase
)

export { listCategoriesController }
