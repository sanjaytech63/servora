import { UserRole } from "../constants/roles";

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  lastLoginAt: Date;
  refreshToken: string;
  googleId?: string;
  githubId?: string;
  avatar?: string;
}
