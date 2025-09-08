import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { RoleEnum } from "@/common/dto/role.dto";
import type { UsersService } from "@/users/users.service";
import type { AuthPayload } from "./entities/payload.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validate(email: string, password: string) {
    const user = await this.usersService.findOne({ email });

    if (user) {
      const match = await compare(password, user.password);
      if (match) {
        return user;
      }
    }

    throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
  }

  async login(email: string, password: string) {
    const user = await this.validate(email, password);

    const payload: AuthPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role ?? RoleEnum.USER,
    };

    return this.jwtService.sign(payload);
  }
}
