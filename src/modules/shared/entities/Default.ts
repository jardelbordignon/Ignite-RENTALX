import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm'

export default class Default {
  @PrimaryColumn()
  id?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date
}
