import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/models/user.model'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>
  ) {}

  pick<T>(newV: T | null, oldV: T) {
    return newV === null ? oldV : newV
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.users.create(createUserDto)
    await user.hashPassword()
    return this.users.save(user)
  }

  findAll() {
    return this.users.find()
  }

  findOne(id: number) {
    return this.users.findOne({
      where: {
        id,
      },
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    user.username = this.pick(updateUserDto.username, user.username)
    user.email = this.pick(updateUserDto.email, user.email)

    if (updateUserDto.password) {
      user.password = updateUserDto.password
      await user.hashPassword()
    }

    return this.users.save(user)
  }

  remove(id: number) {
    return this.users.delete(id)
  }
}
