import { Request, Response } from 'express'

import ListSpecificationsUseCase from './ListSpecificationsUseCase'

export default class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {}

  handle(request: Request, response: Response): Response {
    const all = this.listSpecificationsUseCase.execute()

    return response.json(all)
  }
}
