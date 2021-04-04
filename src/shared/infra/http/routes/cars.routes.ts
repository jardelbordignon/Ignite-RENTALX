import { Router } from 'express'
import multer from 'multer'

import configUpload from '@/config/upload'
import { CreateCarController } from '@/modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@/modules/cars/useCases/createCarSpecification/createCarSpecificationController'
import { ListAvailableCarsController } from '@/modules/cars/useCases/listAvailabeCars/ListAvailableCarsController'
import { UploadCarImagesController } from '@/modules/cars/useCases/uploadCarImages/UploadCarImagesController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const createCarSpecificationController = new CreateCarSpecificationController()
const listAvailableCarsController = new ListAvailableCarsController()
const uploadCarImagesController = new UploadCarImagesController()

const upload = multer(configUpload.upload('./tmp/cars'))

carsRoutes.get('/available', listAvailableCarsController.handle)

carsRoutes.use([ensureAuthenticated, ensureAdmin])

carsRoutes.post('/', createCarController.handle)

carsRoutes.post(
  '/specifications/:car_id',
  createCarSpecificationController.handle
)

carsRoutes.post(
  '/images/:car_id',
  upload.array('images'),
  uploadCarImagesController.handle
)

export { carsRoutes }
