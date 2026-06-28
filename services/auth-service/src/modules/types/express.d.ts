import { UserRole } from "@servora/shared";

declare global {
  namespace Express {
    interface UserPayload {
      userId: string;
      role: UserRole;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};