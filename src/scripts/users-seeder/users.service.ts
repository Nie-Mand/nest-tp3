import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { randWord } from '@ngneat/falso'
import { Repository } from 'typeorm'
import { User } from '../../models/user.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>
  ) {}

  async seed() {
    // const skills = new Array(10).fill(null).map(() => ({
    //   label: randWord(),
    // }))
    // for (const skill of skills) {
    //   await this.skills.save(skill)
    // }
    // console.log('done')
  }
}
