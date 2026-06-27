import { createEnv } from "@servora/shared/src/configs/env";
import { z } from "zod";

export const env = createEnv({
  PORT: z.coerce.number().default(5003),

  BOOKING_MONGO_URI: z.string().min(1),
});
