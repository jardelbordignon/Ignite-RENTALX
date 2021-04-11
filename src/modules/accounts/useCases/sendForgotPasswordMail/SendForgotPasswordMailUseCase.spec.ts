import { UsersRepositoryInMemory } from '@/modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@/modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'
import { DayjsDateProvider } from '@/shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { MailProviderInMemory } from '@/shared/container/providers/MailProvider/in-memory/MailProviderInMemory'
import { AppError } from '@/shared/errors/AppError'

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let mailProvider: MailProviderInMemory

describe('SendForgotPasswordMailUseCase', () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail')

    await usersRepositoryInMemory.create({
      driver_license: '987654321',
      email: 'user@email.com',
      name: 'User Test',
      password: '1234',
    })

    await sendForgotPasswordMailUseCase.execute('user@email.com')

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send a forgot password if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('non-existent-user@email.com')
    ).rejects.toEqual(new AppError('User does not exists'))
  })

  it('should be able to create an user token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'save')

    await usersRepositoryInMemory.create({
      driver_license: '987654321',
      email: 'user@email.com',
      name: 'User Test',
      password: '1234',
    })

    await sendForgotPasswordMailUseCase.execute('user@email.com')

    expect(generateTokenMail).toBeCalled()
  })
})
