import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column, OneToMany,
} from 'typeorm'
import { IsString } from 'class-validator'
import { Ticket } from '../tickets/entity'

@Entity()
class Event extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
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

  @OneToMany(_ => Ticket, ticket => ticket.event)
  tickets: Ticket[]
}

export { Event }
