/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { CommonDto } from '@/common/dto/common.dto'
import { RoleDto } from '@/common/dto/role.dto'
import { ApplyMixins } from '@/common/helpers/mixins.helper'

import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator'

export class UserDto extends CommonDto {
  @IsOptional()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minLength: 8,
  })
  password: string

  @IsOptional()
  @IsString()
  avatar: string
}

export interface UserDto extends RoleDto {}
ApplyMixins(UserDto, [RoleDto])
