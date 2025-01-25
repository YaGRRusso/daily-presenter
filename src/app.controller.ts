import { AppService } from './app.service'

import { Body, Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Body() data?: any): string {
    return this.appService.getHello(data)
  }
}
