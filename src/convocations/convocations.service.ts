import { CreateConvocationDto } from './dto/create-convocation.dto'
import { FindConvocationDto } from './dto/find-convocation.dto'
import { UpdateConvocationDto } from './dto/update-convocation.dto'

import { JwtUser } from '@/auth/entities/user.entity'
import { ApplyQuery, QueryMethod } from '@/common/helpers/query.helper'
import { Convocation } from '@/schemas/convocation.schema'
import { UsersService } from '@/users/users.service'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ConvocationsService {
  constructor(
    @InjectModel(Convocation.name) private ConvocationModel: Model<Convocation>,
    private readonly usersService: UsersService,
  ) {}

  private shuffleAndSlice = (array: any[], slice?: number) => {
    return array.sort(() => 0.5 - Math.random()).slice(0, slice ?? array.length)
  }

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
    user?: JwtUser,
  ) {
    const randomizedUsers = this.shuffleAndSlice(createConvocationDto.invitedUsers, selectedLength)
    const parsedExpiresAt = this.parseDate(expiresAt).toISOString()

    const newConvocation = new this.ConvocationModel({
      ...createConvocationDto,
      selectedUsers: randomizedUsers,
      expiresAt: parsedExpiresAt,
      createdBy: user?.id,
    })

    const convocation = await newConvocation.save()
    return convocation.populate([
      { path: 'selectedUsers', select: ['username', 'slackId'] },
      { path: 'invitedUsers', select: ['username'] },
      { path: 'createdBy', select: ['username'] },
    ])
  }

  async findAll(findConvocationDto?: FindConvocationDto, method?: QueryMethod) {
    return this.ConvocationModel.find(ApplyQuery(findConvocationDto, method))
      .populate([
        { path: 'selectedUsers', select: ['username', 'slackId'] },
        { path: 'invitedUsers', select: ['username'] },
        { path: 'createdBy', select: ['username'] },
      ])
      .exec()
  }

  async findOne(findConvocationDto?: FindConvocationDto) {
    return this.ConvocationModel.findOne(findConvocationDto)
      .populate([
        { path: 'selectedUsers', select: ['username', 'slackId'] },
        { path: 'invitedUsers', select: ['username'] },
        { path: 'createdBy', select: ['username'] },
      ])
      .exec()
  }

  async findOneOrCreate(createConvocationDto: CreateConvocationDto, user?: JwtUser) {
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

  async slack(user?: JwtUser) {
    const today = new Date()
    const baseUrl = 'http://ec2-18-228-3-189.sa-east-1.compute.amazonaws.com:3000/convocations/key'

    const daysOfWeek = [
      'domingo',
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira',
      'sábado',
    ]

    const users = await this.usersService.findAll()
    const invitedUsers = users.map((user) => user.id)
    const selectedLength = 6 - today.getDay()
    const expiresAt = selectedLength + 'd'

    const presenterKey = 'week-presenter'
    const presenter = await this.findOneOrCreate(
      {
        invitedUsers,
        selectedLength,
        expiresAt,
        key: presenterKey,
        name: 'Presenter Convocation',
      },
      user,
    )

    const curiosityKey = 'week-curiosity'
    const curiosity = await this.findOneOrCreate(
      {
        invitedUsers,
        selectedLength,
        expiresAt,
        key: curiosityKey,
        name: 'Curiosity Convocation',
      },
      user,
    )

    const generateList = (users: any[]) => {
      return users.map((user, index) => {
        const day = new Date(today)
        day.setDate(today.getDate() + index)

        const dayNumber = day.getDay()
        if (dayNumber === 0 || dayNumber === 6) return

        const dayName = daysOfWeek[dayNumber]
        const formattedDate = `${day.getDate().toString().padStart(2, '0')}/${(day.getMonth() + 1).toString().padStart(2, '0')}`

        return `- ${dayName} (${formattedDate}): ${user.username}`
      })
    }

    const presentersList = generateList(presenter.selectedUsers)
    const curiositiesList = generateList(curiosity.selectedUsers)

    return {
      response_type: 'in_channel',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'Apresentadores da Daily',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: [
              'Escolhidos para apresentar',
              ...presentersList,
              `_<${[baseUrl, curiosityKey].join('/')}|ver detalhes>_`,
            ].join('\n'),
          },
        },
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'Curiosidades da Daily',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: [
              'Escolhidos para compartilhar curiosidades',
              ...curiositiesList,
              `_<${[baseUrl, curiosityKey].join('/')}|ver detalhes>_`,
            ].join('\n'),
          },
        },
      ],
    }
  }
}
