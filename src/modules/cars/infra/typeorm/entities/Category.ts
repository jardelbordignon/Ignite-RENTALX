import { Column, Entity } from 'typeorm'

import Default from '@/shared/infra/typeorm/entities/Default'

@Entity('categories')
export default class Category extends Default {
  @Column()
  name: string

  @Column()
  description: string
}
