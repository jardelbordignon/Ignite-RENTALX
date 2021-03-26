import { Column, Entity } from 'typeorm'

import Default from '../../../shared/entities/Default'

@Entity('specifications')
export default class Specification extends Default {
  @Column()
  name: string

  @Column()
  description: string
}
