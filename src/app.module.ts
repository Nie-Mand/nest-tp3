import { Module } from '@nestjs/common'
import { SkillModule } from './skill/skill.module'
import { UserModule } from './user/user.module'
import { CvModule } from './cv/cv.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './models/user.model'
import { Skill } from './models/skill.model'
import { Cv } from './models/cv.model'

@Module({
  imports: [
    ConfigModule.forRoot(),
    SkillModule,
    UserModule,
    CvModule,

    User,
    Skill,
    Cv,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: JSON.parse(process.env.DATABASE_SSL),
      entities: [User, Skill, Cv],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, Skill, Cv]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
