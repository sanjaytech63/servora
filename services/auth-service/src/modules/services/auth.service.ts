import bcrypt from "bcryptjs";

import { USER_ROLES } from "@servora/shared";

import { AppError } from "../../errors/AppError";

import { UserRepository } from "../repositories/user.repository";

import { ChangePasswordInput, LoginInput, RegisterInput } from "../validators/auth.validation";

import { toUserDto } from "../mappers/user.mapper";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../utils/jwt";
import { SessionService } from "../sessions/session.service";
import {
  signEmailToken,
  signResetToken,
  verifyEmailToken,
  verifyResetToken,
} from "../../utils/email-token";
import { MailService } from "../../services/mail.service";
import { verifyEmailTemplate } from "../../templates/verify-email";
import { env } from "../../config/env";
import { forgotPasswordTemplate } from "../../templates/forgot-password.template";
import { GoogleProfile } from "../types/oauth.types";

export class AuthService {
  static async register(payload: RegisterInput) {
    const existingUser = await UserRepository.exists(payload.email);

    if (existingUser) {
      throw new AppError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(payload.password, 12);

    const user = await UserRepository.create({
      fullName: payload.fullName,
      email: payload.email.toLowerCase(),
      password: hashedPassword,
      role: USER_ROLES.USER,
    });

    const token = signEmailToken(user._id.toString());

    const verifyUrl = `${env.APP_URL}/verify-email?token=${token}`;

    await MailService.send(user.email, "Verify Your Email", verifyEmailTemplate(verifyUrl));

    return toUserDto(user);
  }

  static async login(payload: LoginInput) {
    const user = await UserRepository.findByEmail(payload.email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isValid = await bcrypt.compare(payload.password, user.password);

    if (!isValid) {
      throw new AppError("Invalid email or password", 401);
    }

    if (!user.isEmailVerified) {
      throw new AppError("Please verify your email first", 403);
    }

    await SessionService.createSession(user._id.toString(), user.role);

    const userDto = toUserDto(user);

    const accessToken = signAccessToken({
      userId: user._id.toString(),
      role: user.role,
    });

    const refreshToken = signRefreshToken({
      userId: user._id.toString(),
      role: user.role,
    });

    return {
      user: userDto,
      accessToken,
      refreshToken,
    };
  }

  static async refreshToken(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken) as {
      userId: string;
      role: string;
    };

    const sessionId = await SessionService.getSession(payload.userId);

    if (!sessionId || sessionId !== payload.userId) {
      throw new AppError("Session expired", 401);
    }

    const accessToken = signAccessToken({
      userId: payload.userId,
      role: payload.role,
    });

    const newRefreshToken = signRefreshToken({
      userId: payload.userId,
      role: payload.role,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  static async me(userId: string) {
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return toUserDto(user);
  }

  static async logout(userId: string) {
    await SessionService.deleteSession(userId);

    return true;
  }

  static async changePassword(userId: string, payload: ChangePasswordInput) {
    const user = await UserRepository.findByIdWithPassword(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isValid = await bcrypt.compare(payload.currentPassword, user.password);

    if (!isValid) {
      throw new AppError("Current password is incorrect", 400);
    }

    const hashedPassword = await bcrypt.hash(payload.newPassword, 12);

    user.password = hashedPassword;

    await user.save();

    await SessionService.deleteSession(userId);

    return true;
  }

  static async verifyEmail(token: string) {
    const payload = verifyEmailToken(token);

    await UserRepository.verifyEmail(payload.userId);

    return true;
  }

  static async resendVerification(email: string) {
    const user = await UserRepository.findByEmailWithoutPassword(email);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.isEmailVerified) {
      throw new AppError("Email already verified", 400);
    }

    const token = signEmailToken(user._id.toString());

    const verifyUrl = `${env.APP_URL}/verify-email?token=${token}`;

    await MailService.send(user.email, "Verify Your Email", verifyEmailTemplate(verifyUrl));

    return true;
  }

  static async forgotPassword(email: string) {
    const user = await UserRepository.findByEmailWithoutPassword(email);

    if (!user) {
      return true;
    }

    const token = signResetToken(user._id.toString());

    const resetUrl = `${env.APP_URL}/reset-password?token=${token}`;

    await MailService.send(user.email, "Reset Password", forgotPasswordTemplate(resetUrl));

    return true;
  }

  static async resetPassword(token: string, password: string) {
    const payload = verifyResetToken(token);

    const user = await UserRepository.findById(payload.userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await UserRepository.updatePassword(payload.userId, hashedPassword);

    await SessionService.deleteSession(payload.userId);

    return true;
  }

  static async googleLogin(profile: GoogleProfile) {
    let user = await UserRepository.findByGoogleId(profile.id);

    if (!user) {
      const email = profile.emails?.[0]?.value;

      if (!email) {
        throw new AppError("Google account email not found", 400);
      }

      user = await UserRepository.findByEmailWithoutPassword(email);

      if (user) {
        user.googleId = profile.id;

        user.isEmailVerified = true;

        await user.save();
      } else {
        const randomPassword = await bcrypt.hash(crypto.randomUUID(), 12);

        user = await UserRepository.create({
          fullName: profile.displayName,

          email,

          password: randomPassword,

          googleId: profile.id,

          avatar: profile.photos?.[0]?.value,

          role: USER_ROLES.USER,

          isEmailVerified: true,
        });
      }
    }

    await SessionService.createSession(user._id.toString(), user.role);

    const accessToken = signAccessToken({
      userId: user._id.toString(),
      role: user.role,
    });

    const refreshToken = signRefreshToken({
      userId: user._id.toString(),
      role: user.role,
    });

    return {
      user: toUserDto(user),
      accessToken,
      refreshToken,
    };
  }
}
