import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional } from "class-validator";

export class CommonDto {
  @ApiProperty()
  @IsOptional()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
