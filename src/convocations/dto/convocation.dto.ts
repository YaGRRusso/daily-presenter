import { CommonDto } from '@/common/dto/common.dto'

import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class ConvocationDto extends CommonDto {
  @IsOptional()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  key: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsArray()
  @MinLength(1)
  @IsString({ each: true })
  invitedUsers: string[]

  @IsOptional()
  @IsArray()
  @MinLength(1)
  @IsString({ each: true })
  selectedUsers: string[]

  @IsOptional()
  @IsDate()
  expiresAt: Date

  @IsOptional()
  @IsString()
  createdBy: string
}
