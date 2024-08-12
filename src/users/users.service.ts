import { CreateUserDto } from './dto/create-user.dto'
import { SearchUserDto } from './dto/search-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { User } from '@/schemas/user.schema'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new this.UserModel(createUserDto)
    return newUser.save()
  }

  search(searchUserDto: SearchUserDto) {
    return this.UserModel.find(searchUserDto).exec()
  }

  findAll() {
    return this.UserModel.find().exec()
  }

  findOne(id: string) {
    return this.UserModel.findById(id).exec()
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.updateOne({ _id: id }, updateUserDto).exec()
  }

  remove(id: string) {
    return this.UserModel.deleteOne({ _id: id }).exec()
  }
}
