import Default from './Default'

interface ICreateCategoryDTO {
  name: string
  description: string
}

class Category extends Default {
  name: string
  description: string
}

export { Category, ICreateCategoryDTO }
