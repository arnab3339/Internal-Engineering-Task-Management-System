import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from "../../configs/server.config.js";

export async function hashPassword(plainPassword: string): Promise<string> {
    return await bcrypt.hash(plainPassword, SALT_ROUNDS);
}