import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { Handler, Context } from 'aws-lambda'
import * as serverless from 'serverless-http'
import { validationConfig } from '@/common/configs/validation.config'
import { filtersConfig } from '@/common/configs/filter.config'
import { config } from 'dotenv'

config()

let cachedHandler: Handler | null = null

async function bootstrap(): Promise<Handler> {
  if (cachedHandler) return cachedHandler
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } })
  validationConfig(app)
  filtersConfig(app)
  await app.init()
  const expressInstance = app.getHttpAdapter().getInstance()
  cachedHandler = (serverless as any)(expressInstance) as Handler
  return cachedHandler
}

export const handler: Handler = async (event: any, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const h = await bootstrap()
  return h(event, context, () => {})
}
