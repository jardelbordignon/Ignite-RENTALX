import { Router } from 'express'

import { CreateSpecificationController } from '@/modules/cars/useCases/createSpecifications/CreateSpecificationController'
import { ListSpecificationsController } from '@/modules/cars/useCases/listSpecificatioins/ListSpecificationsController'
import { ensureAuthenticated } from '@/shared/infra/http/middlewares/ensureAuthenticated'

const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController()

const specificationsRoutes = Router()

specificationsRoutes.use(ensureAuthenticated)

specificationsRoutes.post('/', createSpecificationController.handle)
specificationsRoutes.get('/', listSpecificationsController.handle)

export { specificationsRoutes }