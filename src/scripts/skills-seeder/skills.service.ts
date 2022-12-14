import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { randWord } from '@ngneat/falso'
import { Repository } from 'typeorm'
import { Skill } from '../../models/skill.model'

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skills: Repository<Skill>
  ) {}

  async seed() {
    const skills = new Array(10).fill(null).map(() => ({
      label: randWord(),
    }))

    for (const skill of skills) {
      await this.skills.save(skill)
    }
    console.log('done')
  }
}
