import { v4 as uuid } from 'uuid'

interface ICreateCategoryDTO {
  name: string
  description: string
}

class Category {
  id?: string
  name: string
  description: string
  created_at: Date

  constructor() {
    if (!this.id) this.id = uuid()
  }
}

export { Category, ICreateCategoryDTO }
