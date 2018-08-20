import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
} from 'typeorm'
import { IsString, IsNumber } from 'class-validator'
import { User } from '../users/entity'

@Entity()
class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: number

  @ManyToOne(_ => User, user => user.forSaleTickets)
  sellerUser: User

  @ManyToOne(_ => User, user => user.purchasedTickets)
  buyerUser: User

  @IsNumber()
  @Column()
  price: number

  @IsString()
  @Column()
  description: string
}

export { Ticket }
