import bcrypt from "bcrypt";

import {
  BCRYPT_SALT
} from "../configs/server.config.js";

export async function hashPassword(
  password: string
): Promise<string> {
  return await bcrypt.hash(
    password,
    BCRYPT_SALT
  );
}