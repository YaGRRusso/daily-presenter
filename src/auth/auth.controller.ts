import { AuthService } from './auth.service'
import { IsPublic } from './decorators/public.decorator'
import { NeedRole } from './decorators/role.decorator'
import { LoginUserDto } from './dto/auth.dto'
import { AuthRequest } from './entities/request.entity'
import { JwtAuthGuard } from './guards/jwt.guard'
import { RoleGuard } from './guards/role.guard'

import { JwtDto } from '@/common/dto/jwt.dto'
import { RoleDto, RoleEnum } from '@/common/dto/role.dto'

import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 200, type: String })
  @Post()
  @IsPublic()
  async login(@Body() { email, password }: LoginUserDto) {
    return await this.authService.login(email, password)
  }

  @ApiResponse({ status: 200, type: JwtDto })
  @Get('me')
  async me(@Req() req: AuthRequest) {
    return req.user
  }

  @ApiResponse({ status: 200, type: RoleDto })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @NeedRole(RoleEnum.ADMIN)
  @Get('admin')
  async admin(@Req() req: AuthRequest) {
    return req.user.role
  }

  @ApiResponse({ status: 200, type: RoleDto })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @NeedRole(RoleEnum.SUPER)
  @Get('super')
  async super(@Req() req: AuthRequest) {
    return req.user.role
  }
}
