import dotenv from "dotenv";

dotenv.config();

export const env = Object.freeze({
  /* ---------- App ---------- */
  NODE_ENV: process.env.NODE_ENV ?? "development",

  PORT: Number(process.env.PORT ?? 5001),

  /* ---------- Database ---------- */
  AUTH_MONGO_URI: process.env.AUTH_MONGO_URI ?? "",

  /* ---------- JWT ---------- */
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? "",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? "",

  /* ---------- Redis ---------- */
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ?? "",
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ?? "",

  SMTP_HOST: process.env.SMTP_HOST ?? "",
  SMTP_PORT: process.env.SMTP_PORT ?? "",

  SMTP_EMAIL: process.env.SMTP_EMAIL ?? "",
  SMTP_PASSWORD: process.env.SMTP_PASSWORD ?? "",

  JWT_EMAIL_SECRET: process.env.JWT_EMAIL_SECRET ?? "",
  JWT_RESET_SECRET: process.env.JWT_RESET_SECRET ?? "",

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? "",
  APP_URL: process.env.APP_URL ?? "",
  CLIENT_URL: process.env.CLIENT_URL ?? "",
});
