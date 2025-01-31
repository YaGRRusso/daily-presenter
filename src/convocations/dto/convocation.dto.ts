import { CommonDto } from '@/common/dto/common.dto'

import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ConvocationDto extends CommonDto {
  @IsNotEmpty()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  assignedUsers: string[]

  @IsOptional()
  @IsDate()
  expiresAt: Date

  @IsNotEmpty()
  @IsString()
  createdBy: string
}
