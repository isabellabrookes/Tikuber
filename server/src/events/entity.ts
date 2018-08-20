import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column, OneToMany,
} from 'typeorm'
import { IsString, IsDate } from 'class-validator'
import { Ticket } from '../tickets/entity'

@Entity()
class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @IsString()
  @Column()
  name: string

  @IsString()
  @Column()
  description: string

  @IsString()
  @Column()
  image: string

  @IsDate()
  @Column()
  startDate: Date

  @IsDate()
  @Column()
  endDate: Date

  @OneToMany(_ => Ticket, ticket => ticket.event)
  tickets: Ticket[]
}

export { Event }
