import { Body, Controller, Get } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { IsPublic } from "./auth/decorators/public.decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({ status: 200, type: Object })
  @Get()
  @IsPublic()
  getHello(@Body() data?: any): string {
    return this.appService.getHello(data);
  }
}
