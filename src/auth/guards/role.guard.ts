import { AuthRequest } from '../entities/request.entity'

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.get('role', context.getHandler())
    if (!requiredRole) return true

    const { user } = context.switchToHttp().getRequest() as AuthRequest

    if (user.role === requiredRole) return true

    throw new UnauthorizedException()
  }
}
