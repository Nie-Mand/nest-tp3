import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { randUserName, randEmail, randPassword } from '@ngneat/falso'
import { Repository } from 'typeorm'
import { User } from '../../models/user.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>
  ) {}

  async seed() {
    for (let i = 0; i < 10; i++) {
      const user = this.users.create({
        username: randUserName(),
        email: randEmail(),
        password: randPassword(),
      })
      await user.hashPassword()
      await this.users.save(user)
    }
    console.log('done')
  }
}
