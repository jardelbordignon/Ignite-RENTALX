import { Column, Entity } from 'typeorm'

import Default from '../../../shared/entities/Default'

@Entity('categories')
export default class Category extends Default {
  @Column()
  name: string

  @Column()
  description: string
}
