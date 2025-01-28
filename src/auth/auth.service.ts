import { UsersService } from '@/users/users.service'

import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    // private readonly jwtService: JwtService,
  ) {}

  // async login(email: string, password: string): CommonOutput<string> {
  //   const user = await this.validate(email, password)
  //   const payload: UserPayload = {
  //     sub: user.id,
  //     email: user.email,
  //     name: user.name,
  //     role: user.role as Role,
  //   }
  //   return this.jwtService.sign(payload)
  // }

  async validate(email: string, password: string) {
    const user = await this.usersService.findOne({ email })

    if (user) {
      const match = await bcrypt.compare(password, user.password)
      if (match) return user
    }

    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
  }
}
