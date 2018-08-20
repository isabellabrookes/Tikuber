import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Exclude } from 'class-transformer'
import { MinLength, IsString, IsEmail } from 'class-validator'
import * as bcrypt from 'bcrypt'
import { Comment } from '../comments/entity'
import { Ticket } from '../tickets/entity'

@Entity()
class User extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id?: number

  @IsString()
  @MinLength(2)
  @Column('text')
  firstName: string

  @IsString()
  @MinLength(2)
  @Column('text')
  lastName: string

  @IsEmail()
  @Column('text')
  email: string

  @IsString()
  @MinLength(8)
  @Column('text')
  @Exclude({ toPlainOnly: true })
  password: string

  @OneToMany(_ => Ticket, ticket => ticket.sellerUser)
  forSaleTickets?: Ticket[]

  @OneToMany(_ => Ticket, ticket => ticket.buyerUser)
  purchasedTickets?: Ticket[]

  @OneToMany(_ => Comment, comment => comment.user)
  comments?: Comment[]


  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}

export { User }
