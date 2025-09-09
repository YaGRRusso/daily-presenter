import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { RoleEnum } from "@/common/dto/role.dto";

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  job: string;

  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

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
  password: string;

  @Prop()
  @IsOptional()
  @IsString()
  avatar?: string;

  @Prop({ default: RoleEnum.USER })
  @IsOptional()
  @IsString()
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @Prop()
  @IsOptional()
  @IsString()
  slackId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
