import { Module } from '@nestjs/common'
import { SkillsService } from './skills.service'
import { Skill } from '../../models/skill.model'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { Cv } from '../../models/cv.model'
import { User } from '../../models/user.model'

@Module({
  imports: [
    ConfigModule.forRoot(),
    Skill,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: JSON.parse(process.env.DATABASE_SSL),
      entities: [Skill, Cv, User],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Skill]),
  ],
  providers: [SkillsService],
})
export class SkillsModule {}
