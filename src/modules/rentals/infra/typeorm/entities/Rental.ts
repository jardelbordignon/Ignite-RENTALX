import { Column, Entity } from 'typeorm'

import Default from '@/shared/infra/typeorm/entities/Default'

@Entity('rentals')
export class Rental extends Default {
  @Column()
  car_id: string

  @Column()
  user_id: string

  @Column({ default: new Date() })
  start_date: Date

  @Column({ default: null })
  end_date: Date

  @Column()
  expected_return_date: Date

  @Column({ default: null })
  total_daily: number

  @Column({ default: null })
  total_fine: number

  @Column({ default: null })
  total: number
}
