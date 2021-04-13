import { inject, injectable } from 'tsyringe'

import { IStorageProvider } from '@/shared/container/providers/StorageProvider/IStorageProvider'
import { deleteFile } from '@/utils/file'

import { ICarsImagesRepository } from '../../repositories/ICarsImagesRepository'

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const existingImages = await this.carsImagesRepository.findByCarId(car_id)

    if (existingImages.length) {
      existingImages.forEach((image) => {
        this.carsImagesRepository.destroy(image.id)
        deleteFile(`./tmp/cars/${image.image_name}`)
      })
    }

    images_name.forEach(async (image_name, sequence_position) => {
      await this.carsImagesRepository.save({
        car_id,
        image_name,
        sequence_position,
      })
      await this.storageProvider.save(image_name, 'cars')
    })
  }
}
