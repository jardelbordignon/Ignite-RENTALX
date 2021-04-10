import { inject, injectable } from 'tsyringe'
import { v4 as uuid } from 'uuid'

import { IDateProvider } from '@/shared/container/providers/DateProvider/IDateProvider'
import { IMailProvider } from '@/shared/container/providers/MailProvider/IMailProvider'
import { AppError } from '@/shared/errors/AppError'

import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('User does not exists')

    const refresh_token = uuid()

    const expires_at = this.dateProvider.addTime(3, 'hours')

    await this.usersTokensRepository.save({
      user_id: user.id,
      refresh_token,
      expires_at,
    })

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      `O link para resetar a senha é ${refresh_token}`
    )
  }
}