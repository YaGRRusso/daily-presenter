import { PickType } from "@nestjs/swagger";
import { UserDto } from "@/users/dto/user.dto";

export class LoginUserDto extends PickType(UserDto, ["email", "password"]) {}

export class MeDto extends PickType(UserDto, ["id", "email", "name", "role"]) {}
