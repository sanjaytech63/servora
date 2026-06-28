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
});
