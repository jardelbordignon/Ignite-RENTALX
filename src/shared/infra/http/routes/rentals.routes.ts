import { Router } from 'express'

import { CreateRentalController } from '@/modules/rentals/useCases/createRental/CreateRentalController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const createRentalController = new CreateRentalController()
const rentalsRoutes = Router()

rentalsRoutes.use(ensureAuthenticated)

rentalsRoutes.post('/', createRentalController.handle)

export { rentalsRoutes }
