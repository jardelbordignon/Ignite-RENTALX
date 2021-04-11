import { UserToken } from '../../infra/typeorm/entities/UserToken'
import {
  ICreateUserTokenDTO,
  IUsersTokensRepository,
} from '../IUsersTokensRepository'

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserToken[] = []

  async deleteById(id: string): Promise<void> {
    this.usersTokens = this.usersTokens.filter((token) => token.id !== id)
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    return this.usersTokens.find(
      (token) => token.refresh_token === refresh_token
    )
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    return this.usersTokens.find(
      (token) =>
        token.user_id === user_id && token.refresh_token === refresh_token
    )
  }

  async save(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken()
    Object.assign(userToken, data)

    this.usersTokens.push(userToken)

    return userToken
  }
}
