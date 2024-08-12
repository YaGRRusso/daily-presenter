import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator'

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  username: string

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string

  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minLength: 8,
  })
  password: string

  @Prop()
  @IsOptional()
  @IsString()
  avatar?: string

  @Prop()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roles?: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
