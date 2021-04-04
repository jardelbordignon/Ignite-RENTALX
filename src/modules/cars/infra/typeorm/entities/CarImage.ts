import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('cars_images')
export class CarImage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  car_id: string

  @Column()
  image_name: string

  @Column()
  sequence_position: number
}
