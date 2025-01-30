import { Role } from '@/common/dto/role.dto'

import { SetMetadata } from '@nestjs/common'

export const ROLE_KEY = 'role'
export const NeedRole = (role: Role) => {
  return SetMetadata(ROLE_KEY, role)
}
