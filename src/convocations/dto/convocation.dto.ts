import { CommonDto } from '@/common/dto/common.dto'

import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ConvocationDto extends CommonDto {
  @IsNotEmpty()
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
  @IsString({ each: true })
  invitedUsers: string[]

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  selectedUsers: string[]

  @IsOptional()
  @IsDateString()
  expiresAt: Date

  @IsNotEmpty()
  @IsString()
  createdBy: string
}
