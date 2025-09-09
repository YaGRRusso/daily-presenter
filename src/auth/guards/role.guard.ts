import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RoleEnum } from "@/common/dto/role.dto";
import { ROLE_KEY } from "../decorators/role.decorator"; // Importar ROLE_KEY
import { AuthRequest } from "../entities/request.entity";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest() as AuthRequest;
    if (requiredRoles.some((role) => user.role === role)) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
