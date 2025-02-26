import { UserDto } from './user.dto'

import { PickType } from '@nestjs/swagger'

export class CreateUserDto extends PickType(UserDto, [
  'avatar',
  'email',
  'name',
  'password',
  'username',
]) {}
