import { ConvocationsService } from './convocations.service'
import { CreateConvocationDto } from './dto/create-convocation.dto'
import { FindConvocationDto } from './dto/find-convocation.dto'
import { UpdateConvocationDto } from './dto/update-convocation.dto'

import { NeedRole } from '@/auth/decorators/role.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt.guard'
import { RoleGuard } from '@/auth/guards/role.guard'
import { RoleEnum } from '@/common/dto/role.dto'

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'

@Controller('convocations')
export class ConvocationsController {
  constructor(private readonly convocationsService: ConvocationsService) {}

  @Post()
  create(@Body() createConvocationDto: CreateConvocationDto) {
    return this.convocationsService.create(createConvocationDto)
  }

  @Get()
  findAll(@Body() findConvocationDto: FindConvocationDto) {
    return this.convocationsService.findAll(findConvocationDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.convocationsService.findOne({ id })
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @NeedRole(RoleEnum.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConvocationDto: UpdateConvocationDto) {
    return this.convocationsService.update(id, updateConvocationDto)
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @NeedRole(RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.convocationsService.remove(id)
  }
}
