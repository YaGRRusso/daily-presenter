import { RoleEnum } from '@/common/dto/role.dto'

export class UserPayload {
  sub: string
  email: string
  name: string
  role: RoleEnum
  iat?: number
  exp?: number
}
