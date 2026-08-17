import { BadRequestError } from "../errors/app.error.js";

export function parseId(id: string): bigint {
    try {
        return BigInt(id);
    } catch {
        throw new BadRequestError("Invalid id format");
    }
}