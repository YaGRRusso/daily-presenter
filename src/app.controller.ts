import { AppService } from './app.service'
import { IsPublic } from './auth/decorators/public.decorator'
import { AdjustDate, AdjustDateUnit } from './common/helpers/date.helper'

import { Body, Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @IsPublic()
  getHello(@Body() data?: any): string {
    console.log(AdjustDate(new Date(), AdjustDateUnit.DAYS, 7))
    return this.appService.getHello(data)
  }
}
