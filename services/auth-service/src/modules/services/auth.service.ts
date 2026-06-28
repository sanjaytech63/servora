import bcrypt from "bcryptjs";

import { USER_ROLES } from "@servora/shared";

import { AppError } from "../../errors/AppError";

import { UserRepository } from "../repositories/user.repository";

import { LoginInput, RegisterInput } from "../validators/auth.validation";
import { toUserDto } from "../mappers/user.mapper";

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

    return toUserDto(user);
  }
}
