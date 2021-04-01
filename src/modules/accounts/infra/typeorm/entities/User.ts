import { Column, Entity } from 'typeorm'

import Default from '@/shared/infra/typeorm/entities/Default'

@Entity('users')
export class User extends Default {
  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  driver_license: string

  @Column({ default: false })
  is_admin: boolean

  @Column({ default: null })
  avatar: string
}
