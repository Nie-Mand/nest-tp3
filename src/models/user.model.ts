import { CoreEntity } from './core.model'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Cv } from './cv.model'

@Entity('user')
export class User extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10)
  }

  checkIfPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password)
  }

  @OneToMany(() => Cv, cv => cv.user)
  resumes: Cv[]
}
