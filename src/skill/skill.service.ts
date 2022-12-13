import { Injectable } from '@nestjs/common'
import { CreateSkillDto } from './dto/create-skill.dto'
import { UpdateSkillDto } from './dto/update-skill.dto'
import { Skill } from '../models/skill.model'

@Injectable()
export class SkillService {
  constructor(private readonly skillRepository: Skill) {}

  create(createSkillDto: CreateSkillDto) {
    return 'This action adds a new skill'
  }

  findAll() {
    return `This action returns all skill`
  }

  findOne(id: number) {
    return `This action returns a #${id} skill`
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return `This action updates a #${id} skill`
  }

  remove(id: number) {
    return `This action removes a #${id} skill`
  }
}
