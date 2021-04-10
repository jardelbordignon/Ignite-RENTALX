import { Router } from 'express'

import { ResetPasswordController } from '@/modules/accounts/useCases/resetPasswordUser/ResetPasswordController'
import { SendForgotPasswordMailController } from '@/modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController'

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordController = new ResetPasswordController()

const passwordRoutes = Router()

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle)
passwordRoutes.post('/reset/:refresh_token', resetPasswordController.handle)

export { passwordRoutes }
