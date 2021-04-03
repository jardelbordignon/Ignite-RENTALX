import { Router } from 'express'

import { CreateCarController } from '@/modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@/modules/cars/useCases/createCarSpecification/createCarSpecificationController'
import { ListAvailableCarsController } from '@/modules/cars/useCases/listAvailabeCars/ListAvailableCarsController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const createCarSpecificationController = new CreateCarSpecificationController()
const listAvailableCarsController = new ListAvailableCarsController()

carsRoutes.get('/available', listAvailableCarsController.handle)

carsRoutes.use([ensureAuthenticated, ensureAdmin])

carsRoutes.post('/', createCarController.handle)

carsRoutes.post(
  '/specifications/:car_id',
  createCarSpecificationController.handle
)

export { carsRoutes }
