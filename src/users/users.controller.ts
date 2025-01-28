import { CreateUserDto } from './dto/create-user.dto'
import { FindUserDto } from './dto/find-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

import { QueryMethod } from '@/common/helpers/query.helper'

import { Controller, Post, Body, Get, Delete, Param, Patch } from '@nestjs/common'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll(@Body() searchUserDto: FindUserDto) {
    return this.usersService.findAll(searchUserDto, QueryMethod.AND)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
