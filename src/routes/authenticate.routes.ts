import { Router } from 'express'

import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController'

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.post('/authenticate', authenticateUserController.handle)

export { authenticateRoutes }
