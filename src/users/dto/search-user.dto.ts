import { UserDto } from './user.dto'

import { PartialType } from '@nestjs/mapped-types'

export class SearchUserDto extends PartialType(UserDto) {}
