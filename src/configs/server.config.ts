import 'dotenv/config';

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_NAME = process.env.DB_NAME || 'task_management_db';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'toor';

export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';


export const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000; // 1 day, in milliseconds

export const COOKIE_SECURE = NODE_ENV === 'production';
export const COOKIE_SAME_SITE = NODE_ENV === 'production' ? 'lax' : 'strict';