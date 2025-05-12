import { ConvocationsService } from './convocations.service'
import { ConvocationDto } from './dto/convocation.dto'
import { CreateConvocationDto } from './dto/create-convocation.dto'
import { FindConvocationDto } from './dto/find-convocation.dto'
import { UpdateConvocationDto } from './dto/update-convocation.dto'

import { IsPublic } from '@/auth/decorators/public.decorator'
import { NeedRole } from '@/auth/decorators/role.decorator'
import { AuthRequest } from '@/auth/entities/request.entity'
import { JwtAuthGuard } from '@/auth/guards/jwt.guard'
import { RoleGuard } from '@/auth/guards/role.guard'
import { RoleEnum } from '@/common/dto/role.dto'

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Convocations')
@Controller('convocations')
export class ConvocationsController {
  constructor(private readonly convocationsService: ConvocationsService) {}

  @ApiResponse({ status: 200, type: ConvocationDto })
  @Post()
  findOneOrCreate(@Req() req: AuthRequest, @Body() createConvocationDto: CreateConvocationDto) {
    return this.convocationsService.findOneOrCreate(createConvocationDto, req.user)
  }

  @ApiResponse({ status: 200, type: ConvocationDto })
  @IsPublic()
  @Post('public')
  findOneOrCreatePublic(@Body() createConvocationDto: CreateConvocationDto) {
    return this.convocationsService.findOneOrCreate(createConvocationDto)
  }

  @ApiResponse({ status: 200, type: ConvocationDto })
  @IsPublic()
  @Get()
  findAll(@Body() findConvocationDto: FindConvocationDto) {
    return this.convocationsService.findAll(findConvocationDto)
  }

  @ApiResponse({ status: 200, type: ConvocationDto })
  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.convocationsService.findOne({ id })
  }

  @ApiResponse({ status: 200, type: ConvocationDto })
  @IsPublic()
  @Get('key/:key')
  findOneByKey(@Param('key') key: string) {
    return this.convocationsService.findOne({ key })
  }

  @ApiResponse({ status: 200, type: ConvocationDto })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @NeedRole(RoleEnum.ADMIN, RoleEnum.SUPER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConvocationDto: UpdateConvocationDto) {
    return this.convocationsService.update(id, updateConvocationDto)
  }

  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @NeedRole(RoleEnum.ADMIN, RoleEnum.SUPER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.convocationsService.remove(id)
  }
}
