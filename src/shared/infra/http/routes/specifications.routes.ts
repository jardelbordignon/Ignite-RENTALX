import { Router } from 'express'

import { CreateSpecificationController } from '@/modules/cars/useCases/createSpecifications/CreateSpecificationController'
import { ListSpecificationsController } from '@/modules/cars/useCases/listSpecificatioins/ListSpecificationsController'
import { ensureAuthenticated } from '@/shared/infra/http/middlewares/ensureAuthenticated'

import { ensureAdmin } from '../middlewares/ensureAdmin'

const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController()

const specificationsRoutes = Router()

specificationsRoutes.get('/', listSpecificationsController.handle)

specificationsRoutes.use([ensureAuthenticated, ensureAdmin])

specificationsRoutes.post('/', createSpecificationController.handle)

export { specificationsRoutes }
