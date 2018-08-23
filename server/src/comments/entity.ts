import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  Column
} from 'typeorm'
import { IsString } from 'class-validator'
import { User } from '../users/entity'
import { Ticket } from '../tickets/entity'

@Entity()
class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(_ => User, user => user.comments, { lazy: true })
  user: Promise<User>

  @ManyToOne(_ => Ticket, ticket => ticket.comments, {eager:false})
  ticket: Ticket

  @IsString()
  @Column()
  comment: string
}

export { Comment }
