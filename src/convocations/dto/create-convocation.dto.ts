import { PickType } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { ConvocationDto } from "./convocation.dto";

export class CreateConvocationDto extends PickType(ConvocationDto, [
  "expiresAt",
  "invitedUsers",
  "key",
  "name",
]) {
  @IsOptional()
  @IsNumber()
  selectedLength: number;
}
