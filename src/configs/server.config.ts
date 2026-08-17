import 'dotenv/config';

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_NAME = process.env.DB_NAME || 'task_system';
export const DB_PASSWORD = process.env.DB_PASSWORD || '1748arijiT#'; 
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10