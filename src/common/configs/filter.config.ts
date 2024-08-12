import { CommonFilter } from '@/common/handlers/common.filter'

import { INestApplication } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

export const filtersConfig = (app: INestApplication) => {
  const { httpAdapter } = app.get(HttpAdapterHost)
  return app.useGlobalFilters(new CommonFilter(httpAdapter))
}
