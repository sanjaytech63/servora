import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";

import { validate } from "../../middlewares/validate.middleware";
import { rateLimit } from "../../middlewares/rateLimit.middleware";

import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  //   changePasswordSchema,
  //   refreshTokenSchema,
  //   verifyEmailSchema,
  resendVerificationSchema,
} from "../validators/auth.validation";

const router = Router();

/* -------------------------------------------------------------------------- */
/*                                   Public                                   */
/* -------------------------------------------------------------------------- */

router.post("/register", rateLimit, validate(registerSchema), AuthController.register);

router.post("/login", rateLimit, validate(loginSchema), AuthController.login);

// router.post("/refresh-token", validate(refreshTokenSchema), AuthController.refreshToken);

router.post(
  "/forgot-password",
  rateLimit,
  validate(forgotPasswordSchema),
  //   AuthController.forgotPassword,
);

router.post(
  "/reset-password",
  rateLimit,
  validate(resetPasswordSchema),
  //   AuthController.resetPassword,
);

// router.post("/verify-email", validate(verifyEmailSchema), AuthController.verifyEmail);

router.post(
  "/resend-verification",
  rateLimit,
  validate(resendVerificationSchema),
  //   AuthController.resendVerification,
);

/* -------------------------------------------------------------------------- */
/*                                 Protected                                  */
/* -------------------------------------------------------------------------- */

// router.patch("/change-password", validate(changePasswordSchema), AuthController.changePassword);

// router.post("/logout", AuthController.logout);

// router.get("/me", AuthController.me);

export default router;
