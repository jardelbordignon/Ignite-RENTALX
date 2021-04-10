import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ResetPasswordUseCase } from './ResetPasswordUsecase'

export class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.params
    const { password } = request.body

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase)

    await resetPasswordUseCase.execute({
      refresh_token: String(refresh_token),
      password,
    })

    return response.send()
  }
}
