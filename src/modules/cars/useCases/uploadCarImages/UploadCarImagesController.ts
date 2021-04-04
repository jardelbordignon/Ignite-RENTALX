import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase'

interface IFile {
  filename: string
}

export class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params
    const images = request.files as IFile[]

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase)

    const images_name = images.map((image) => image.filename)

    await uploadCarImagesUseCase.execute({
      car_id,
      images_name,
    })

    return response.status(201).send()
  }
}
