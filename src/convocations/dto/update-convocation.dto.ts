import { CreateConvocationDto } from './create-convocation.dto'

import { PickType } from '@nestjs/swagger'

export class UpdateConvocationDto extends PickType(CreateConvocationDto, ['expiresAt', 'name']) {}
