import { Expose } from 'class-transformer'
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

  @Expose({ name: 'avatar_url' })
  avatar_url(): string {
    switch (process.env.STORAGE_PROVIDER) {
      case 'local':
        return `${process.env.BACKEND_URL}/avatar/${this.avatar}`
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`
      default:
        return null
    }
  }
}
