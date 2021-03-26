import { Router } from 'express'

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecifications/CreateSpecificationController'
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecificatioins/ListSpecificationsController'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController()

specificationsRoutes.post('/', createSpecificationController.handle)
specificationsRoutes.get('/', listSpecificationsController.handle)

export { specificationsRoutes }
