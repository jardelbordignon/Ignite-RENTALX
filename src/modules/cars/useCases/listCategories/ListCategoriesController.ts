import { Request, Response } from 'express'

import ListCategoriesUseCase from './ListCategoriesUseCase'

export default class ListCategoriesController {
  constructor(private listCategoriesuseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const all = this.listCategoriesuseCase.execute()

    return response.json(all)
  }
}
