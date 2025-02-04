import { ConvocationDto } from './convocation.dto'

import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateConvocationDto extends ConvocationDto {
  @IsNotEmpty()
  @IsNumber()
  selectedLength: number
}
