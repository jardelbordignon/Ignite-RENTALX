import { getRepository, Repository } from 'typeorm'

import {
  ICreateUserTokenDTO,
  IUsersTokensRepository,
} from '@/modules/accounts/repositories/IUsersTokensRepository'

import { UserToken } from '../entities/UserToken'

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = getRepository(UserToken)
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    return this.repository.findOne({ user_id, refresh_token })
  }

  async save(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create(data)

    await this.repository.save(userToken)

    return userToken
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
