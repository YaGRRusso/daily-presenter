// import { AppModule } from './app.module'

// import { NestFactory } from '@nestjs/core'

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule)
//   await app.listen(3000)
// }
// bootstrap()

import { AppModule } from './app.module'

import { appConfig } from '@/common/configs/app.config'
import { filtersConfig } from '@/common/configs/filter.config'
import { validationConfig } from '@/common/configs/validation.config'

import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [/(https?:[/]{2})?localhost:\d+/, /https:[/]{2}profile-info-panel.*\.vercel\.app/],
    },
  })

  validationConfig(app)
  filtersConfig(app)
  await appConfig(app)
}
bootstrap()
