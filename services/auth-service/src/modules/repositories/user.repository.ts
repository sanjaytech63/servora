import { IUserDocument } from "../types/user.types";
import { User } from "../models/user.model";
import { USER_ROLES } from "@servora/shared";

export class UserRepository {
  static findByEmail(email: string) {
    return User.findOne({
      email: email.toLowerCase(),
    }).select("+password");
  }

  static create(data: Partial<IUserDocument>) {
    return User.create(data);
  }

  static findById(id: string) {
    return User.findById(id);
  }

  static exists(email: string) {
    return User.exists({
      email: email.toLowerCase(),
    });
  }

  static updateLastLogin(userId: string) {
    return User.findByIdAndUpdate(userId, {
      lastLoginAt: new Date(),
    });
  }

  static findByIdWithPassword(userId: string) {
    return User.findById(userId).select("+password");
  }

  static verifyEmail(userId: string) {
    return User.findByIdAndUpdate(
      userId,
      {
        isEmailVerified: true,
      },
      {
        new: true,
      },
    );
  }

  static updatePassword(userId: string, password: string) {
    return User.findByIdAndUpdate(
      userId,
      {
        password,
      },
      {
        new: true,
      },
    );
  }

  static findByEmailWithoutPassword(email: string) {
    return User.findOne({
      email: email.toLowerCase(),
    });
  }

  static findByGoogleId(googleId: string) {
    return User.findOne({
      googleId,
    });
  }

  static findByGithubId(githubId: string) {
    return User.findOne({
      githubId,
    });
  }

  static createGoogleUser(data: {
  fullName: string;
  email: string;
  googleId: string;
  avatar?: string;
}) {
  return User.create({
    ...data,
    role: USER_ROLES.USER,
    isEmailVerified: true,
  });
}

}
