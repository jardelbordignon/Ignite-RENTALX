import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import Default from '@/shared/infra/typeorm/entities/Default'

import { Category } from './Category'

@Entity('cars')
export class Car extends Default {
  @Column()
  name: string

  @Column()
  description: string

  @Column()
  daily_rate: number

  @Column({ default: true })
  available: boolean

  @Column()
  license_plate: string

  @Column()
  fine_amount: number

  @Column()
  brand: string

  @Column()
  category_id: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category
}
