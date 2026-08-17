import { UserTokenPayload } from "../user.type.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};