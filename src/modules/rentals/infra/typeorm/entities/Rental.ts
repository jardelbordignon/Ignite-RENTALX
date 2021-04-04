import { Entity } from 'typeorm'

import Default from '@/shared/infra/typeorm/entities/Default'

@Entity('rentals')
export class Rental extends Default {
  car_id: string

  user_id: string

  start_date: Date

  end_date: Date

  expected_return_date: Date

  total: number
}
