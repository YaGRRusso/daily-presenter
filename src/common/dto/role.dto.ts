import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";

export enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER = "SUPER",
}

export class RoleDto {
  @ApiProperty()
  @IsString()
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
