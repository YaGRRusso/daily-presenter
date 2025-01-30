import { RoleEnum } from '@/common/dto/role.dto'

import { SetMetadata } from '@nestjs/common'

export const ROLE_KEY = 'role'
export const NeedRole = (role: RoleEnum) => {
  return SetMetadata(ROLE_KEY, role)
}
