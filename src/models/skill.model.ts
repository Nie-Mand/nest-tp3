import { CoreEntity } from './core.model'
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Cv } from './cv.model'

@Entity('skill')
export class Skill extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true,
    unique: true,
  })
  label: string

  @ManyToMany(() => Cv, cv => cv.skills)
  resumes: Cv[]
}
