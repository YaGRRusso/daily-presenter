import { AuthService } from './auth.service'
import { IsPublic } from './decorators/public.decorator'
import { NeedRole } from './decorators/role.decorator'
import { LoginUserDto } from './dto/auth.dto'
import { AuthRequest } from './entities/request.entity'
import { JwtAuthGuard } from './guards/jwt.guard'
import { RoleGuard } from './guards/role.guard'

import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @IsPublic()
  async login(@Body() { email, password }: LoginUserDto) {
    return await this.authService.login(email, password)
  }

  @Get('me')
  async me(@Req() req: AuthRequest) {
    return req.user
  }

  @NeedRole('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('validate')
  async validate(@Req() req: AuthRequest) {
    return req.user
  }
}
