import express from "express";

import {
  login,
  register,
  getProfile,
  logout,
  resetPassword,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

import validate from "../middleware/validateMiddleware.js";

import { registerSchema, loginSchema } from "../validators/authValidator.js";

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// REGISTER
router.post(
  "/register",

  validate(registerSchema),

  register,
);

// LOGIN
router.post(
  "/login",

  validate(loginSchema),

  login,
);

// PROFILE
router.get(
  "/profile",

  protect,

  getProfile,
);

// LOGOUT
router.post(
  "/logout",

  logout,
);

//RESET PASSWORD
router.put("/reset-password", resetPassword);

export default router;
