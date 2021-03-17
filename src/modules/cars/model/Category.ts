import Default from '../../shared/model/Default'

interface ICreateCategoryDTO {
  name: string
  description: string
}

class Category extends Default {
  name: string
  description: string
}

export { Category, ICreateCategoryDTO }
