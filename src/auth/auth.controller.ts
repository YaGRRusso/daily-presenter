import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/auth.dto'

import { Controller, Post, Body } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() { email, password }: LoginUserDto) {
    return await this.authService.validate(email, password)
  }
}
