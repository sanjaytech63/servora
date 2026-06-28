import { z } from "zod";

export const createEnv = <T extends z.ZodRawShape>(schema: T) => {
  return z.object(schema).parse(process.env);
};
