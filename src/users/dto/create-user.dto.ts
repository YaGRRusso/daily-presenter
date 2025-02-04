import { UserDto } from './user.dto'

import { PickType } from '@nestjs/mapped-types'

export class CreateUserDto extends PickType(UserDto, [
  'avatar',
  'email',
  'name',
  'password',
  'username',
]) {}
