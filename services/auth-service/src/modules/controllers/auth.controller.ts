import { Request, Response } from "express";

import { AuthService } from "../services/auth.service";

import { asyncHandler } from "../../utils/asyncHandler";
import { clearRefreshCookie, setRefreshCookie } from "../../utils/cookies";
import { AppError } from "../../errors/AppError";
import { GoogleProfile } from "../types/oauth.types";
import { env } from "../../config/env";

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response) => {
    const user = await AuthService.register(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);

    setRefreshCookie(res, result.refreshToken);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  });

  static refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new AppError("Refresh token missing", 401);
    }

    const result = await AuthService.refreshToken(refreshToken);

    setRefreshCookie(res, result.refreshToken);

    return res.status(200).json({
      success: true,
      data: {
        accessToken: result.accessToken,
      },
    });
  });

  static me = asyncHandler(async (req: Request, res: Response) => {
    const user = await AuthService.me(req.user!.userId);

    return res.status(200).json({
      success: true,
      data: user,
    });
  });

  static changePassword = asyncHandler(async (req: Request, res: Response) => {
    await AuthService.changePassword(req.user!.userId, req.body);

    clearRefreshCookie(res);

    res.status(200).json({
      success: true,
      message: "Password changed successfully. Please login again.",
    });
  });

  static verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    await AuthService.verifyEmail(req.body.token);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  });

  static resendVerification = asyncHandler(async (req: Request, res: Response) => {
    await AuthService.resendVerification(req.body.email);

    res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
    });
  });

  static forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    await AuthService.forgotPassword(req.body.email);

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  });

  static resetPassword = asyncHandler(async (req: Request, res: Response) => {
    await AuthService.resetPassword(req.body.token, req.body.password);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  });

  static logout = asyncHandler(async (req: Request, res: Response) => {
    await AuthService.logout(req.user!.userId);

    clearRefreshCookie(res);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });

  static googleCallback = asyncHandler(async (req: Request, res: Response) => {
    const result = await AuthService.googleLogin(req.user as GoogleProfile);

    setRefreshCookie(res, result.refreshToken);

    res.redirect(`${env.CLIENT_URL}/oauth-success?token=${result.accessToken}`);
  });
}
