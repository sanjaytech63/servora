import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const signEmailToken = (userId: string) => {
  return jwt.sign({ userId }, env.JWT_EMAIL_SECRET, {
    expiresIn: "15m",
  });
};

export const verifyEmailToken = (token: string) => {
  return jwt.verify(token, env.JWT_EMAIL_SECRET) as {
    userId: string;
  };
};

export const signResetToken = (userId: string) => {
  return jwt.sign({ userId }, env.JWT_RESET_SECRET, {
    expiresIn: "15m",
  });
};

export const verifyResetToken = (token: string) => {
  return jwt.verify(token, env.JWT_RESET_SECRET) as {
    userId: string;
  };
};
