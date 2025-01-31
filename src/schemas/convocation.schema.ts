import { User } from './user.schema'

import { AdjustDate, AdjustDateUnit } from '@/common/helpers/date.helper'

import { Prop, Schema } from '@nestjs/mongoose'
import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator'
import mongoose from 'mongoose'

@Schema({ timestamps: true })
export class Convocation {
  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  key: string

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  assignedUsers: User[]

  @Prop({ default: AdjustDate(new Date(), AdjustDateUnit.DAYS, 7) })
  @IsDate()
  expiresAt: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsNotEmpty()
  @IsString()
  createdBy: User
}
