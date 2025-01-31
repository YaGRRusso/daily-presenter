import { CreateUserDto } from './dto/create-user.dto'
import { FindUserDto } from './dto/find-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { RoleEnum } from '@/common/dto/role.dto'
import { ApplyQuery, QueryMethod } from '@/common/helpers/query.helper'
import { User } from '@/schemas/user.schema'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async create({ password, ...createUserDto }: CreateUserDto) {
    delete createUserDto.role
    const hash = await bcrypt.hash(password, 8)
    const newUser = new this.UserModel({ password: hash, role: RoleEnum.USER, ...createUserDto })
    return newUser.save()
  }

  async findAll(findUserDto?: FindUserDto, method?: QueryMethod) {
    return this.UserModel.find(ApplyQuery(findUserDto, method)).select('-password').exec()
  }

  async findOne(findUserDto?: FindUserDto) {
    return this.UserModel.findOne(findUserDto).exec()
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.updateOne({ _id: id }, updateUserDto).select('-password').exec()
  }

  async remove(id: string) {
    return this.UserModel.deleteOne({ _id: id }).select('-password').exec()
  }
}
