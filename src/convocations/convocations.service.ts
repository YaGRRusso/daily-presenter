import { CreateConvocationDto } from './dto/create-convocation.dto'
import { FindConvocationDto } from './dto/find-convocation.dto'
import { UpdateConvocationDto } from './dto/update-convocation.dto'

import { JwtUser } from '@/auth/entities/user.entity'
import { AdjustDateEasy, CurrentWeekDays } from '@/common/helpers/date.helper'
import { ApplyQuery, QueryMethod } from '@/common/helpers/query.helper'
import { Convocation } from '@/schemas/convocation.schema'
import { User } from '@/schemas/user.schema'
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

  async create(
    { selectedLength, expiresAt, ...createConvocationDto }: CreateConvocationDto,
    user?: JwtUser,
  ) {
    const randomizedUsers = this.shuffleAndSlice(
      [...createConvocationDto.invitedUsers],
      selectedLength,
    )
    const parsedExpiresAt = expiresAt instanceof Date ? expiresAt : AdjustDateEasy(expiresAt)

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
    const currentWeekDays = CurrentWeekDays()
    const baseUrl = 'http://ec2-18-228-3-189.sa-east-1.compute.amazonaws.com:3000'

    const users = await this.usersService.findAll()
    const invitedUsers = users.map((user) => user.id)
    const expiresAt = currentWeekDays[6].date

    const presenterKey = 'week-presenter'
    const presenter = await this.findOneOrCreate(
      {
        name: 'Presenter Convocation',
        key: presenterKey,
        selectedLength: 5,
        invitedUsers,
        expiresAt,
      },
      user,
    )

    const curiosityKey = 'week-curiosity'
    const curiosity = await this.findOneOrCreate(
      {
        name: 'Curiosity Convocation',
        key: curiosityKey,
        selectedLength: 5,
        invitedUsers,
        expiresAt,
      },
      user,
    )

    const generateList = (users: User[]) => {
      return users.map((user, index) => {
        const { day, date } = currentWeekDays[index + 1]
        return `- ${day} (${date.toLocaleDateString('pt', { day: '2-digit', month: '2-digit' })}): ${user.slackId ? `<@${user.slackId}>` : user.username}`
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
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: [
              'Escolhidos para apresentar o board:',
              ...presentersList,
              `_<${[baseUrl, 'convocations/key', presenterKey].join('/')}|ver detalhes>_`,
            ].join('\n'),
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'Curiosidades da Daily',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: [
              'Escolhidos para compartilhar curiosidades:',
              ...curiositiesList,
              `_<${[baseUrl, 'convocations/key', curiosityKey].join('/')}|ver detalhes>_`,
            ].join('\n'),
          },
        },
      ],
    }
  }
}
