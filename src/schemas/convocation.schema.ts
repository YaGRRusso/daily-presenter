import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import mongoose from "mongoose";
import { AdjustDateEasy } from "@/common/helpers/date.helper";
import { User } from "./user.schema";

@Schema({ timestamps: true })
export class Convocation {
  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  key: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
  @IsNotEmpty()
  @IsArray()
  @MinLength(1)
  @IsString({ each: true })
  invitedUsers: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
  @IsNotEmpty()
  @IsArray()
  @MinLength(1)
  @IsString({ each: true })
  selectedUsers: User[];

  @Prop({ default: AdjustDateEasy("7d") })
  @IsDate()
  expiresAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  @IsOptional()
  @IsString()
  createdBy: User;
}

export const ConvocationSchema = SchemaFactory.createForClass(Convocation);
ConvocationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
