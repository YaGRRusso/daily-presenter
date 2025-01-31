import { CreateUserDto } from './dto/create-user.dto'
import { FindUserDto } from './dto/find-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

import { IsPublic } from '@/auth/decorators/public.decorator'
import { AuthRequest } from '@/auth/entities/request.entity'
import { QueryMethod } from '@/common/helpers/query.helper'

import { Controller, Post, Body, Get, Delete, Param, Patch, Req } from '@nestjs/common'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll(@Body() findUserDto: FindUserDto) {
    return this.usersService.findAll(findUserDto, QueryMethod.AND)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id })
  }

  @Patch()
  update(@Req() req: AuthRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto)
  }

  @Delete()
  remove(@Req() req: AuthRequest) {
    return this.usersService.remove(req.user.id)
  }
}
