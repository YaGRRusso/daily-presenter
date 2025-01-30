import { RoleEnum } from '@/common/dto/role.dto'

export class JwtUser {
  id: string
  email: string
  name: string
  role: RoleEnum
}
