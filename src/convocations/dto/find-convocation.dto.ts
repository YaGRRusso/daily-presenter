import { ConvocationDto } from './convocation.dto'

import { PartialType } from '@nestjs/mapped-types'

export class FindConvocationDto extends PartialType(ConvocationDto) {}
