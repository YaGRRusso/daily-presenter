import { CreateConvocationDto } from './create-convocation.dto'

import { PartialType } from '@nestjs/mapped-types'

export class UpdateConvocationDto extends PartialType(CreateConvocationDto) {}
