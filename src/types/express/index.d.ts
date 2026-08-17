import { JwtPayload } from "../../utils/helpers/jwt.helper.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};