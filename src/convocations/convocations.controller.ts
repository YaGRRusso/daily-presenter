import { ConvocationsService } from './convocations.service'
import { CreateConvocationDto } from './dto/create-convocation.dto'
import { FindConvocationDto } from './dto/find-convocation.dto'
import { UpdateConvocationDto } from './dto/update-convocation.dto'

import { NeedRole } from '@/auth/decorators/role.decorator'
import { AuthRequest } from '@/auth/entities/request.entity'
import { JwtAuthGuard } from '@/auth/guards/jwt.guard'
import { RoleGuard } from '@/auth/guards/role.guard'
import { RoleEnum } from '@/common/dto/role.dto'

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common'

@Controller('convocations')
export class ConvocationsController {
  constructor(private readonly convocationsService: ConvocationsService) {}

  @Post()
  create(@Req() req: AuthRequest, @Body() createConvocationDto: CreateConvocationDto) {
    return this.convocationsService.create({ createdBy: req.user.id, ...createConvocationDto })
  }

  @Post('findOrCreate')
  findOneOrCreate(@Req() req: AuthRequest, @Body() createConvocationDto: CreateConvocationDto) {
    return this.convocationsService.findOneOrCreate({
      createdBy: req.user.id,
      ...createConvocationDto,
    })
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
