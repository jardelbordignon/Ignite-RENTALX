import { UserToken } from '../infra/typeorm/entities/UserToken'

export interface ICreateUserTokenDTO {
  user_id: string
  expires_at: Date
  refresh_token: string
}

export interface IUsersTokensRepository {
  save(data: ICreateUserTokenDTO): Promise<UserToken>
}
