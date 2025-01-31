import { ConvocationsService } from './convocations.service'

import { Test, TestingModule } from '@nestjs/testing'

describe('ConvocationsService', () => {
  let service: ConvocationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConvocationsService],
    }).compile()

    service = module.get<ConvocationsService>(ConvocationsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
