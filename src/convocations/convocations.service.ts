import { CreateConvocationDto } from './dto/create-convocation.dto'
import { FindConvocationDto } from './dto/find-convocation.dto'
import { UpdateConvocationDto } from './dto/update-convocation.dto'

import { JwtUser } from '@/auth/entities/user.entity'
import { ApplyQuery, QueryMethod } from '@/common/helpers/query.helper'
import { Convocation } from '@/schemas/convocation.schema'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ConvocationsService {
  constructor(@InjectModel(Convocation.name) private ConvocationModel: Model<Convocation>) {}

  private shuffleAndSlice = (array: any[], slice?: number) =>
    array.sort(() => 0.5 - Math.random()).slice(0, slice ?? array.length)

  private parseDate(input: string | Date): Date {
    if (input instanceof Date) return input

    const relativeDateRegex = /^([+-]?)(\d+)([hdmy])$/

    if (!relativeDateRegex.test(input)) {
      const potentialAbsoluteDate = new Date(input)
      if (!isNaN(potentialAbsoluteDate.getTime())) {
        return potentialAbsoluteDate
      }
    }

    const match = input.match(relativeDateRegex)
    const date = new Date()

    if (match) {
      const sign = match[1]
      let value = parseInt(match[2], 10)
      const unit = match[3]

      if (sign === '-') value = -value

      switch (unit) {
        case 'h':
          date.setHours(date.getHours() + value)
          break
        case 'd':
          date.setDate(date.getDate() + value)
          break
        case 'm':
          date.setMonth(date.getMonth() + value)
          break
        case 'y':
          date.setFullYear(date.getFullYear() + value)
          break
        default:
          throw new Error('Invalid unit for relative date.')
      }
    }

    return date
  }

  async create(
    { selectedLength, expiresAt, ...createConvocationDto }: CreateConvocationDto,
    user: JwtUser,
  ) {
    const randomizedUsers = this.shuffleAndSlice(createConvocationDto.invitedUsers, selectedLength)
    const parsedExpiresAt = this.parseDate(expiresAt).toISOString()

    const newConvocation = new this.ConvocationModel({
      ...createConvocationDto,
      selectedUsers: randomizedUsers,
      expiresAt: parsedExpiresAt,
      createdBy: user.id,
    })

    const convocation = await newConvocation.save()
    return convocation.populate([
      { path: 'invitedUsers', select: ['username', 'name', 'email'] },
      { path: 'selectedUsers', select: ['username', 'name', 'email'] },
    ])
  }

  async findAll(findConvocationDto?: FindConvocationDto, method?: QueryMethod) {
    return this.ConvocationModel.find(ApplyQuery(findConvocationDto, method))
      .populate([
        { path: 'invitedUsers', select: ['username', 'name', 'email'] },
        { path: 'selectedUsers', select: ['username', 'name', 'email'] },
      ])
      .exec()
  }

  async findOne(findConvocationDto?: FindConvocationDto) {
    return this.ConvocationModel.findOne(findConvocationDto)
      .populate([
        { path: 'invitedUsers', select: ['username', 'name', 'email'] },
        { path: 'selectedUsers', select: ['username', 'name', 'email'] },
      ])
      .exec()
  }

  async findOneOrCreate(createConvocationDto: CreateConvocationDto, user: JwtUser) {
    const convocation = await this.findOne({ key: createConvocationDto.key })
    if (convocation) return convocation

    const newConvocation = await this.create(createConvocationDto, user)
    return newConvocation
  }

  async update(id: string, updateConvocationDto: UpdateConvocationDto) {
    return this.ConvocationModel.updateOne({ _id: id }, updateConvocationDto).exec()
  }

  async remove(id: string) {
    return this.ConvocationModel.deleteOne({ _id: id }).exec()
  }
}
