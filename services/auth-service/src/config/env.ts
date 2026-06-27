import { createEnv } from "@servora/shared/src/configs/env";
import { z } from "zod";
const isTest = process.env.NODE_ENV === "test";
export const env = createEnv({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  PORT: z.coerce.number().default(5001),

  AUTH_MONGO_URI: isTest ? z.string().optional() : z.string().min(1),

  JWT_SECRET: isTest ? z.string().optional() : z.string().min(1),

  JWT_REFRESH_SECRET: isTest ? z.string().optional() : z.string().min(1),

  UPSTASH_REDIS_REST_URL: z.string().optional(),

  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
});
