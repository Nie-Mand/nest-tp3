import { NestFactory } from '@nestjs/core'
import { UsersModule } from './users.module'
import { UsersService } from './users.service'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(UsersModule)
  const usersService = app.get(UsersService)
  await usersService.seed()
  await app.close()
}
bootstrap()
