import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "../config/redis";
import { Request, Response, NextFunction } from "express";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, "1 m"),
});

export const rateLimit = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  }

  next();
};
