import { Router } from 'express'

import { CreateRentalController } from '@/modules/rentals/useCases/createRental/CreateRentalController'
import { DevolutionRentalController } from '@/modules/rentals/useCases/devolutionRental/DevolutionRentalController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()

const rentalsRoutes = Router()

rentalsRoutes.use(ensureAuthenticated)

rentalsRoutes.post('/', createRentalController.handle)
rentalsRoutes.post('/devolution/:id', devolutionRentalController.handle)

export { rentalsRoutes }
