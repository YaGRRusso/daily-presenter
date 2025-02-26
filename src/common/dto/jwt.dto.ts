import { RoleEnum } from './role.dto'

import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString } from 'class-validator'

export class JwtDto {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  @IsEnum(RoleEnum)
  role: RoleEnum
}
