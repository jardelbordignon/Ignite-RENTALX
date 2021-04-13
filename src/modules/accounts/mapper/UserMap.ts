import { classToClass } from 'class-transformer'

import { User } from '../infra/typeorm/entities/User'

export interface IUserResponseDTO {
  id: string
  name: string
  email: string
  avatar: string
  driver_license: string
  avatar_url(): string
}

export class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      email,
      name,
      avatar,
      driver_license,
      avatar_url,
    })
    return user
  }
}
