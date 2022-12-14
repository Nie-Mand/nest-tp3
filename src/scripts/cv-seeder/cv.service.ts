import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  randWord,
  randUserName,
  randEmail,
  randPassword,
  randProgrammingLanguage,
  randNumber,
} from '@ngneat/falso'
import { Cv } from '../../models/cv.model'
import { User } from '../../models/user.model'
import { Repository } from 'typeorm'
import { Skill } from '../../models/skill.model'

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Skill)
    private readonly skills: Repository<Skill>,

    @InjectRepository(User)
    private readonly users: Repository<User>,

    @InjectRepository(Cv)
    private readonly cv: Repository<Cv>
  ) {}

  async seedSkills() {
    const skills = []

    for (let i = 0; i < 10; i++) {
      const skill = this.skills.create({
        label: randProgrammingLanguage(),
      })

      skills.push(await this.skills.save(skill))
    }

    return skills
  }

  async seedUsers() {
    const users = []

    for (let i = 0; i < 10; i++) {
      const user = this.users.create({
        username: randUserName(),
        email: randEmail(),
        password: randPassword(),
      })

      await user.hashPassword()

      users.push(await this.users.save(user))
    }

    return users
  }

  async seed() {
    const skills = await this.seedSkills()
    const users = await this.seedUsers()

    for (let i = 0; i < 10; i++) {
      const cv = this.cv.create({
        fullname: randWord(),
        Age: randNumber({
          min: 18,
          max: 60,
        }),
        Cin: randNumber({
          min: 10000000,
          max: 99999999,
        }).toString(),
        Job: randWord(),
        path: randWord(),
        // user: users[i],
        // skills: [skills[i]],
      })

      await this.cv.save(cv)
    }

    // inset skills
    for (let i = 0; i < 10; i++) {
      const cv = await this.cv.findOne({
        where: {
          id: i + 1,
        },
      })

      if (!cv) {
        continue
      }

      cv.skills = [skills[i]]

      await this.cv.save(cv)
    }

    // inset user
    for (let i = 0; i < 10; i++) {
      const cv = await this.cv.findOne({
        where: {
          id: i + 1,
        },
      })

      if (!cv) {
        continue
      }

      cv.user = users[i]

      await this.cv.save(cv)
    }

    console.log('done')
  }
}
