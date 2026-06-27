import { createEnv } from "@servora/shared/src/configs/env";
import { z } from "zod";

export const env = createEnv({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  PORT: z.coerce.number().default(5002),

  USER_MONGO_URI: z.string().min(1),
});
