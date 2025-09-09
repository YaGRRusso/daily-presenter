import { PickType } from "@nestjs/swagger";
import { CreateConvocationDto } from "./create-convocation.dto";

export class UpdateConvocationDto extends PickType(CreateConvocationDto, [
  "expiresAt",
  "name",
]) {}
