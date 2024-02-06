import dotenv from 'dotenv'

dotenv.config()

export const environments = {
  PORT: process.env.PORT || 80,
  DB_HOST: process.env.DB_HOST || "",
  DB_USER: process.env.DB_USER || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  DB_DATABASE: process.env.DB_DATABASE || "",
};
