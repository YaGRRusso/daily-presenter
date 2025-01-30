import { AuthService } from './auth.service'
import { IsPublic } from './decorators/public.decorator'
import { NeedRole } from './decorators/role.decorator'
import { LoginUserDto } from './dto/auth.dto'
import { AuthRequest } from './entities/request.entity'
import { JwtAuthGuard } from './guards/jwt.guard'
import { RoleGuard } from './guards/role.guard'

import { RoleEnum } from '@/common/dto/role.dto'

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

  @UseGuards(JwtAuthGuard, RoleGuard)
  @NeedRole(RoleEnum.MANAGER)
  @Get('manager')
  async manager(@Req() req: AuthRequest) {
    return req.user.role
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @NeedRole(RoleEnum.ADMIN)
  @Get('admin')
  async admin(@Req() req: AuthRequest) {
    return req.user.role
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @NeedRole(RoleEnum.SUPER)
  @Get('super')
  async super(@Req() req: AuthRequest) {
    return req.user.role
  }
}
