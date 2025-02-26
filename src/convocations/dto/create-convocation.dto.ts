import { ConvocationDto } from './convocation.dto'

import { PickType } from '@nestjs/swagger'
import { IsNumber, IsOptional } from 'class-validator'

export class CreateConvocationDto extends PickType(ConvocationDto, [
  'expiresAt',
  'invitedUsers',
  'key',
  'name',
]) {
  @IsOptional()
  @IsNumber()
  selectedLength: number
}
