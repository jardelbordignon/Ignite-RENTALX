import { User } from '@/modules/accounts/infra/typeorm/entities/User'

export interface ICreateUserDTO {
  name: string
  password: string
  email: string
  driver_license: string
  id?: string
  avatar?: string
}

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
}

export { IUsersRepository }
