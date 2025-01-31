import { ConvocationsController } from './convocations.controller'
import { ConvocationsService } from './convocations.service'

import { Module } from '@nestjs/common'

@Module({
  controllers: [ConvocationsController],
  providers: [ConvocationsService],
})
export class ConvocationsModule {}
