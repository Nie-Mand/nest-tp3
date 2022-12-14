import { Injectable, HttpException } from '@nestjs/common'
import { CreateSkillDto } from './dto/create-skill.dto'
import { UpdateSkillDto } from './dto/update-skill.dto'
import { Skill } from '../models/skill.model'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skills: Repository<Skill>
  ) {}

  create(createSkillDto: CreateSkillDto) {
    const skill = this.skills.create(createSkillDto)
    return this.skills.save(skill)
  }

  findAll() {
    return this.skills.find()
  }

  findOne(id: number) {
    return this.skills.findOne({
      where: {
        id,
      },
    })
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    console.log('updateSkillDto', updateSkillDto)

    const skill = await this.findOne(id)

    if (!skill) {
      throw new HttpException('Skill not found', 404)
    }

    skill.label = updateSkillDto.label

    return this.skills.save(skill)
  }

  remove(id: number) {
    return this.skills.delete(id)
  }
}
