import { NestFactory } from '@nestjs/core'
import { CvModule } from './cv.module'
import { CvService } from './cv.service'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CvModule)
  const cvService = app.get(CvService)
  await cvService.seed()
  await app.close()
}
bootstrap()
