import { Column, Entity } from 'typeorm'

import Default from '@/shared/infra/typeorm/entities/Default'

@Entity('specifications')
export default class Specification extends Default {
  @Column()
  name: string

  @Column()
  description: string
}
