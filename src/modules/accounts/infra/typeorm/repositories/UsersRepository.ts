import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '@/modules/accounts/dtos/ICreateUserDTO'
import { User } from '@/modules/accounts/infra/typeorm/entities/User'
import { IUsersRepository } from '@/modules/accounts/repositories/IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const userdata = { ...data, isAdmin: false }
    const user = this.repository.create(userdata)
    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email })
  }

  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id)
  }
}
