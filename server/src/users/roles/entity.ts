import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../entity";

export type RoleType = 'Admin' | 'User'
@Entity()
class Role extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column('text', {default: 'User'} )
  type: RoleType

  @OneToMany(_ => User, user => user.role)
  users: User[]

}

export { Role }
