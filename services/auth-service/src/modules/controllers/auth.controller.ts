import { Request, Response } from "express";

import { AuthService } from "../services/auth.service";
import { asyncHandler } from "../../utils/asyncHandler";

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response) => {
    const user = await AuthService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const user = await AuthService.login(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
    });
  });
}
