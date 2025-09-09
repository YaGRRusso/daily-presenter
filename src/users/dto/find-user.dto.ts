import { PartialType } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class FindUserDto extends PartialType(UserDto) {}
