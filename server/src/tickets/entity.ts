import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  Column, OneToMany, CreateDateColumn,
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
  image?: string

  @ManyToOne(_ => Event, event => event.tickets, {eager:true})
  event: Event

  @ManyToOne(_ => User, user => user.ticketsForSale, {eager:true})
  sellerUser: User

  @OneToMany(_ => Comment, comment => comment.ticket, {eager: true})
  comments: Comment[]

  @ManyToOne(_ => User, user => user.ticketsPurchased, {eager: true})
  buyerUser: User

  @CreateDateColumn()
  createdAt: Date

}

export { Ticket }
