import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  Column, OneToMany,
} from 'typeorm'
import { IsString, IsNumber } from 'class-validator'
import { User } from '../users/entity'
import { Event } from '../events/entity'
import { Comment } from '../comments/entity'

@Entity()
class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @IsNumber()
  @Column()
  price: number

  @IsString()
  @Column()
  description: string

  @IsString()
  @Column()
  image: string

  @ManyToOne(_ => Event, event => event.tickets)
  event: Event

  @ManyToOne(_ => User, user => user.ticketsForSale)
  sellerUser: User

  @OneToMany(_ => Comment, comment => comment.user)
  comments: Comment[]

  @ManyToOne(_ => User, user => user.ticketsPurchased)
  buyerUser?: User
}

export { Ticket }
