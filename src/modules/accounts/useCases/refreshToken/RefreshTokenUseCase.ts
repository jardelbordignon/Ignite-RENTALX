import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '@/config/auth'
import { IDateProvider } from '@/shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@/shared/errors/AppError'

import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'

interface IPayload {
  sub: string
  email: string
}

interface IRefreshTokenResponse {
  token: string
  refresh_token: string
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<IRefreshTokenResponse> {
    const { secret_refresh_token, expires_in_refresh_token: expiresIn } = auth
    const { email, sub } = verify(token, secret_refresh_token) as IPayload

    const user_id = sub

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    )

    if (!userToken) throw new AppError('Refresh Token does not exists')

    await this.usersTokensRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn,
    })

    const expires_at = this.dateProvider.addTime(30, 'days')

    await this.usersTokensRepository.save({
      user_id,
      refresh_token,
      expires_at,
    })

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn,
    })

    return {
      token: newToken,
      refresh_token,
    }
  }
}
