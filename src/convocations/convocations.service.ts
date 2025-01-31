import { CreateConvocationDto } from './dto/create-convocation.dto'
import { FindConvocationDto } from './dto/find-convocation.dto'
import { UpdateConvocationDto } from './dto/update-convocation.dto'

import { Injectable } from '@nestjs/common'

@Injectable()
export class ConvocationsService {
  create(createConvocationDto: CreateConvocationDto) {
    return ['This action adds a new convocation', createConvocationDto]
  }

  findAll(findConvocationDto?: FindConvocationDto) {
    return [`This action returns all convocations`, findConvocationDto]
  }

  findOne(findConvocationDto?: FindConvocationDto) {
    return [`This action returns one convocation`, findConvocationDto]
  }

  update(id: string, updateConvocationDto: UpdateConvocationDto) {
    return [`This action updates a #${id} convocation`, updateConvocationDto]
  }

  remove(id: string) {
    return [`This action removes a #${id} convocation`]
  }
}
