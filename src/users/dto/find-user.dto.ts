import { UserDto } from './user.dto'

import { PartialType } from '@nestjs/swagger'

export class FindUserDto extends PartialType(UserDto) {}
