import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";

import { validate } from "../../middlewares/validate.middleware";

import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  resendVerificationSchema,
  changePasswordSchema,
  verifyEmailSchema,
  // refreshTokenSchema,
} from "../validators/auth.validation";
import { protect } from "../../middlewares/auth.middleware";
import passport from "passport";

const router = Router();

/* -------------------------------------------------------------------------- */
/*                                   Public                                   */
/* -------------------------------------------------------------------------- */

router.post("/register", validate(registerSchema), AuthController.register);

router.post("/login", validate(loginSchema), AuthController.login);

router.post("/refresh-token",  AuthController.refreshToken);

router.post(
  "/forgot-password",

  validate(forgotPasswordSchema),
  AuthController.forgotPassword,
);

router.post(
  "/reset-password",

  validate(resetPasswordSchema),
  AuthController.resetPassword,
);

router.post("/verify-email", validate(verifyEmailSchema), AuthController.verifyEmail);

router.post(
  "/resend-verification",
  validate(resendVerificationSchema),
  AuthController.resendVerification,
);

/* -------------------------------------------------------------------------- */
/*                                 Protected                                  */
/* -------------------------------------------------------------------------- */

router.patch(
  "/change-password",
  protect,
  validate(changePasswordSchema),
  AuthController.changePassword,
);

router.get("/me", protect, AuthController.me);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  AuthController.googleCallback,
);

router.post("/logout", protect, AuthController.logout);

export default router;
