import { CreateUserDto } from './dto/create-user.dto'
import { SearchUserDto } from './dto/search-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { User } from '@/schemas/user.schema'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async create({ password, ...createUserDto }: CreateUserDto) {
    const hash = await bcrypt.hash(password, 8)
    const newUser = new this.UserModel({ password: hash, ...createUserDto })
    return newUser.save()
  }

  search(searchUserDto: SearchUserDto) {
    return this.UserModel.find(searchUserDto).select('-password').exec()
  }

  findAll() {
    return this.UserModel.find().select('-password').exec()
  }

  findOne(id: string) {
    return this.UserModel.findById(id).select('-password').exec()
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.updateOne({ _id: id }, updateUserDto).select('-password').exec()
  }

  remove(id: string) {
    return this.UserModel.deleteOne({ _id: id }).select('-password').exec()
  }
}
