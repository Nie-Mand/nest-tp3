import { Module } from '@nestjs/common'
import { CvService } from './cv.service'
import { CvController } from './cv.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cv } from 'src/models/cv.model'
import { User } from 'src/models/user.model'
import { Skill } from 'src/models/skill.model'

@Module({
  imports: [TypeOrmModule.forFeature([Cv, User, Skill])],
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}
