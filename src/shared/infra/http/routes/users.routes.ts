import { Router } from 'express'
import multer from 'multer'

import configUpload from '@/config/upload'
import { CreateUserController } from '@/modules/accounts/useCases/createUser/CreateUserController'
import { ProfileUserController } from '@/modules/accounts/useCases/profileUser/ProfileUserController'
import { UpdateUserAvatarController } from '@/modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'
import { ensureAuthenticated } from '@/shared/infra/http/middlewares/ensureAuthenticated'

const usersRoutes = Router()
const uploadAvatar = multer(configUpload)

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.use(ensureAuthenticated)

usersRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
)

usersRoutes.get('/profile', profileUserController.handle)

export { usersRoutes }
