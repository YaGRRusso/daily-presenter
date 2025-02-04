import { AppService } from './app.service'
import { IsPublic } from './auth/decorators/public.decorator'

import { Body, Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @IsPublic()
  getHello(@Body() data?: any): string {
    return this.appService.getHello(data)
  }
}
