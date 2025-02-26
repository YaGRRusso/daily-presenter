import { CreateUserDto } from './dto/create-user.dto'
import { FindUserDto } from './dto/find-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user.dto'
import { UsersService } from './users.service'

import { IsPublic } from '@/auth/decorators/public.decorator'
import { AuthRequest } from '@/auth/entities/request.entity'
import { QueryMethod } from '@/common/helpers/query.helper'

import { Controller, Post, Body, Get, Delete, Param, Patch, Req } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 200, type: UserDto })
  @Post()
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @ApiResponse({ status: 200, type: UserDto })
  @Get()
  findAll(@Body() findUserDto: FindUserDto) {
    return this.usersService.findAll(findUserDto, QueryMethod.AND)
  }

  @ApiResponse({ status: 200, type: UserDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id })
  }

  @ApiResponse({ status: 200, type: UserDto })
  @Patch()
  update(@Req() req: AuthRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto)
  }

  @ApiResponse({ status: 200, type: Boolean })
  @Delete()
  remove(@Req() req: AuthRequest) {
    return this.usersService.remove(req.user.id)
  }
}
