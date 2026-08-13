import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } from "./server.config.js";
import { logger } from "./logger.config.js";

const adapter = new PrismaMariaDb({
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD
});

export const prisma = new PrismaClient({
    adapter
});

export async function connectToDatabase() {
    try {
        await prisma.$connect();
        logger.info('Database Connected Successfully');
    } catch (error) {
        logger.error('Someting went wrong, db not connected');
        process.exit(1);
    }
}