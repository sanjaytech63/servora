import { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/AppError";

import { UserRole } from "@servora/shared";

export const authorize =
  (...roles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Unauthorized", 401));
    }

    if (!roles.includes(req.user.role as UserRole)) {
      return next(new AppError("Forbidden", 403));
    }

    next();
  };
