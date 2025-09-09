import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { IsPublic } from "@/auth/decorators/public.decorator";
import { NeedRole } from "@/auth/decorators/role.decorator";
import { AuthRequest } from "@/auth/entities/request.entity";
import { JwtAuthGuard } from "@/auth/guards/jwt.guard";
import { RoleGuard } from "@/auth/guards/role.guard";
import { RoleEnum } from "@/common/dto/role.dto";
import { QueryMethod } from "@/common/helpers/query.helper";
import { CreateUserDto } from "./dto/create-user.dto";
import { FindUserDto } from "./dto/find-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDto } from "./dto/user.dto";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 200, type: UserDto })
  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({ status: 200, type: UserDto })
  @IsPublic()
  @Get()
  findAll(@Body() findUserDto: FindUserDto) {
    return this.usersService.findAll(findUserDto, QueryMethod.AND);
  }

  @ApiResponse({ status: 200, type: UserDto })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne({ id });
  }

  @ApiResponse({ status: 200, type: UserDto })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @NeedRole(RoleEnum.SUPER, RoleEnum.ADMIN)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @NeedRole(RoleEnum.SUPER, RoleEnum.ADMIN)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }

  @ApiResponse({ status: 200, type: UserDto })
  @UseGuards(JwtAuthGuard)
  @Patch("me")
  updateMe(@Req() req: AuthRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(JwtAuthGuard)
  @Delete("me")
  removeMe(@Req() req: AuthRequest) {
    return this.usersService.remove(req.user.id);
  }
}
