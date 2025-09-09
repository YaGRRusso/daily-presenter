import { Request } from "express";
import { JwtUser } from "./user.entity";

export class AuthRequest extends Request {
  user: JwtUser;
}
