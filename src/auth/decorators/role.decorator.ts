import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "@/common/dto/role.dto";

export const ROLE_KEY = "roles";
export const NeedRole = (...roles: RoleEnum[]) => {
  return SetMetadata(ROLE_KEY, roles);
};
