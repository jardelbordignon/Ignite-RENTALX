import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import Default from '@/shared/infra/typeorm/entities/Default'

import { User } from './User'

@Entity('users_tokens')
export class UserToken extends Default {
  @Column()
  user_id: string

  @Column()
  refresh_token: string

  @Column()
  expires_at: Date

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User
}
