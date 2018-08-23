import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity} from 'typeorm'
import { Exclude } from 'class-transformer'
import { MinLength, IsString, IsEmail } from 'class-validator'
import * as bcrypt from 'bcrypt'
import { Comment } from '../comments/entity'
import { Ticket } from '../tickets/entity'
import { Role } from './roles/entity'

@Entity()
class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => Role, role => role.type, {eager:true})
  role: Role

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

  @OneToMany(_ => Ticket, ticket => ticket.sellerUser, {eager:false})
  ticketsForSale?: Ticket[]

  @OneToMany(_ => Ticket, ticket => ticket.buyerUser, {eager:false})
  ticketsPurchased?: Ticket[]

  @OneToMany(_ => Comment, comment => comment.user, { lazy: true })
  comments: Comment[]


  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}

export { User }
