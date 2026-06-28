import mongoose from "mongoose";
import { logger } from "@servora/shared";
import { env } from "./env";

export const connectDB = async () => {
  try {
    if (!env.AUTH_MONGO_URI) {
      throw new Error("AUTH_MONGO_URI is missing");
    }

    await mongoose.connect(env.AUTH_MONGO_URI);

    logger.info("MongoDB Connected");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
