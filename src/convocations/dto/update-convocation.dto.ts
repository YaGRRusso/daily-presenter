import { CreateConvocationDto } from './create-convocation.dto'

import { PickType } from '@nestjs/mapped-types'

export class UpdateConvocationDto extends PickType(CreateConvocationDto, ['expiresAt', 'name']) {}
