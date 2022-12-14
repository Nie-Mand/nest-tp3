import { NestFactory } from '@nestjs/core'
import { SkillsModule } from './skills.module'
import { SkillsService } from './skills.service'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SkillsModule)
  const skillsService = app.get(SkillsService)
  await skillsService.seed()
  await app.close()
}
bootstrap()
