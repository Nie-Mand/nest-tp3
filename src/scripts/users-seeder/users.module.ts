import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { Skill } from '../../models/skill.model'
import { Cv } from '../../models/cv.model'
import { User } from '../../models/user.model'

@Module({
  imports: [
    ConfigModule.forRoot(),
    User,
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
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService],
})
export class UsersModule {}
