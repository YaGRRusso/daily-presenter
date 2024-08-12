import { UsersController } from './users.controller'
import { UsersService } from './users.service'

import { User, UserSchema } from '@/schemas/user.schema'

import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
