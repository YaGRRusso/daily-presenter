import { UserDto } from './user.dto'

import { PickType } from '@nestjs/swagger'

export class CreateUserDto extends PickType(UserDto, [
  'slackId',
  'avatar',
  'email',
  'name',
  'job',
  'password',
  'username',
]) {}
