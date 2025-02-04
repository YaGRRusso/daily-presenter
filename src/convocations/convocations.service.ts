import { CreateConvocationDto } from './dto/create-convocation.dto'
import { FindConvocationDto } from './dto/find-convocation.dto'
import { UpdateConvocationDto } from './dto/update-convocation.dto'

import { ApplyQuery, QueryMethod } from '@/common/helpers/query.helper'
import { Convocation } from '@/schemas/convocation.schema'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ConvocationsService {
  constructor(@InjectModel(Convocation.name) private ConvocationModel: Model<Convocation>) {}

  private shuffleAndSlice = (array: any[], slice: number) =>
    array.sort(() => 0.5 - Math.random()).slice(0, slice)

  async create({ selectedUsers, selectedLength, ...createConvocationDto }: CreateConvocationDto) {
    const randomizedUsers = this.shuffleAndSlice(selectedUsers, selectedLength)
    const newConvocation = new this.ConvocationModel({
      selectedUsers: randomizedUsers,
      ...createConvocationDto,
    })
    return newConvocation.save()
  }

  async findAll(findConvocationDto?: FindConvocationDto, method?: QueryMethod) {
    return this.ConvocationModel.find(ApplyQuery(findConvocationDto, method))
      .populate('assignedUsers')
      .exec()
  }

  async findOne(findConvocationDto?: FindConvocationDto) {
    return this.ConvocationModel.findOne(findConvocationDto).exec()
  }

  async findOneOrCreate(createConvocationDto: CreateConvocationDto) {
    const convocation = await this.findOne({ key: createConvocationDto.key })
    if (convocation) return convocation

    const newConvocation = await this.create(createConvocationDto)
    return newConvocation
  }

  async update(id: string, updateConvocationDto: UpdateConvocationDto) {
    return this.ConvocationModel.updateOne({ _id: id }, updateConvocationDto).exec()
  }

  async remove(id: string) {
    return this.ConvocationModel.deleteOne({ _id: id }).exec()
  }
}
