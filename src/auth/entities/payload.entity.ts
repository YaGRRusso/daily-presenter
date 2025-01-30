import { RoleEnum } from '@/common/dto/role.dto'

export class AuthPayload {
  sub: string
  email: string
  name: string
  role: RoleEnum
  iat?: number
  exp?: number
}
