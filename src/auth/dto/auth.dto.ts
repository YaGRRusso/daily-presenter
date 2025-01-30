import { UserDto } from '@/users/dto/user.dto'

import { PickType } from '@nestjs/mapped-types'

export class LoginUserDto extends PickType(UserDto, ['email', 'password']) {}

export class MeDto extends PickType(UserDto, ['avatar', 'email', 'name', 'role', 'username']) {}
