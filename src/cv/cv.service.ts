import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Cv } from 'src/models/cv.model'
import { Skill } from 'src/models/skill.model'
import { User } from 'src/models/user.model'
import { Repository } from 'typeorm'
import { CreateCvDto } from './dto/create-cv.dto'
import { UpdateCvDto } from './dto/update-cv.dto'

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly cv: Repository<Cv>,

    @InjectRepository(User)
    private readonly users: Repository<User>,

    @InjectRepository(Skill)
    private readonly skills: Repository<Skill>
  ) {}

  async create(createCvDto: CreateCvDto) {
    const user = await this.users.findOne({
      where: {
        id: createCvDto.user,
      },
    })

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    const cv = new Cv()

    cv.fullname = createCvDto.fullname
    cv.Age = createCvDto.Age
    cv.Cin = createCvDto.Cin
    cv.Job = createCvDto.Job
    cv.path = createCvDto.path

    cv.user = user

    cv.skills = []

    for (const label of createCvDto.skills) {
      const skill = await this.skills.create({
        label,
      })

      cv.skills.push(skill)
    }

    await this.cv.save(cv)

    if (!user.resumes) {
      user.resumes = []
    }

    user.resumes.push(cv)

    await this.users.save(user)

    return cv
  }

  findAll() {
    return this.cv.find()
  }

  findOne(id: number) {
    return this.cv.findOne({
      where: {
        id,
      },
      relations: ['skills', 'user'],
    })
  }

  update(_id: number, _updateCvDto: UpdateCvDto) {
    return `Not implemented yet ${_id} ${_updateCvDto}`
  }

  remove(id: number) {
    return this.cv.delete(id)
  }
}
