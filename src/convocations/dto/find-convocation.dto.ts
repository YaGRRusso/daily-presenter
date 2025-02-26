import { ConvocationDto } from './convocation.dto'

import { PartialType } from '@nestjs/swagger'

export class FindConvocationDto extends PartialType(ConvocationDto) {}
