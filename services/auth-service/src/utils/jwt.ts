import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const signAccessToken = (payload: object) => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const signRefreshToken = (payload: object) => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
};
