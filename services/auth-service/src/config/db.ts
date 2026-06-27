import { logger } from "@servora/shared";
import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.AUTH_MONGO_URI!);
    logger.info("MongoDB Connected");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
