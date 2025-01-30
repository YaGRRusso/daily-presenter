// @Injectable()
import { PUBLIC_KEY } from '../decorators/public.decorator'

import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) return true

    const canActivate = super.canActivate(context)
    if (typeof canActivate === 'boolean') return canActivate

    const canActivatePromise = canActivate as Promise<boolean>
    return canActivatePromise.catch((error) => {
      throw new UnauthorizedException(error.message && error.message)
    })
  }
}
