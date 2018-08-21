import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column, OneToMany, ManyToOne,
} from 'typeorm'
import { IsString, IsDate } from 'class-validator'
import { Ticket } from '../tickets/entity'
import { Venue } from '../venues/entity'

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

  @ManyToOne(_ => Venue, venue => venue.events, {eager:true})
  venue: Venue

  @OneToMany(_ => Ticket, ticket => ticket.event, {eager:true})
  tickets: Ticket[]
}

export { Event }
