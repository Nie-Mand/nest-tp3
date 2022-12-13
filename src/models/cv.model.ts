import { CoreEntity } from './core.model'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm'
import { User } from './user.model'
import { Skill } from './skill.model'

@Entity('cv')
export class Cv extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fullname: string

  @Column()
  Age: number

  @Column()
  Cin: string

  @Column()
  Job: string

  @Column()
  path: string

  @ManyToMany(() => Skill, skill => skill.resumes)
  skills: Skill[]

  @OneToMany(() => User, user => user.resumes)
  user: User
}
