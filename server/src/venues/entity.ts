import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { IsString } from 'class-validator'
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

  @IsString()
  @Column()
  phone: string

  @IsString()
  @Column()
  website: string

  @OneToMany(_ => Event, events => events.venue)
  events: Event[]

}

export { Venue }
