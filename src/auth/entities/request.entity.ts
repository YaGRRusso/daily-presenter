import { JwtUser } from './user.entity'

import { Request } from 'express'

export class AuthRequest extends Request {
  user: JwtUser
}
