import { CommonDto } from '@/common/dto/common.dto'

import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ConvocationDto extends CommonDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  key: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  invitedUsers: string[]

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  selectedUsers: string[]

  @ApiProperty()
  @IsOptional()
  @IsString()
  expiresAt: Date

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  createdBy: string
}
