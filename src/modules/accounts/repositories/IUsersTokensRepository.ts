import { UserToken } from '../infra/typeorm/entities/UserToken'

export interface ICreateUserTokenDTO {
  user_id: string
  expires_at: Date
  refresh_token: string
}

export interface IUsersTokensRepository {
  deleteById(id: string): Promise<void>
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>
  save(data: ICreateUserTokenDTO): Promise<UserToken>
}
