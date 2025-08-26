import dotenv from 'dotenv'
dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const PORT = process.env.PORT as string;
export const FRONTEND_URL = process.env.FRONTEND_URL as string;
export const MONGODB_URL = process.env.MONGODB_URL as string;