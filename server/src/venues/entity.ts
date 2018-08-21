import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { IsString, IsNumber} from 'class-validator'
import { Event } from '../events/entity'


@Entity()
class Venue extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @IsString()
  @Column()
  name: string

  @IsString()
  @Column()
  address: string

  @IsNumber()
  @Column()
  phone: number

  @OneToMany(_ => Event, events => events.venue)
  events: Event[]

}

export { Venue }
