import mongoose from "mongoose";
import { env } from "./env";
import logger from "@servora/shared/src/utils/logger";

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
