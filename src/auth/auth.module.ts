import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy.service'

import { UsersModule } from '@/users/users.module'

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { config } from 'dotenv'

config()
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
