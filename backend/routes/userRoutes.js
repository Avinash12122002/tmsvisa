import express from "express";

import {
  getUsers,
} from "../controllers/userController.js";

import protect
from "../middleware/authMiddleware.js";

import adminMiddleware
from "../middleware/adminMiddleware.js";

const router =
  express.Router();

// ======================
// GET USERS
// ======================

router.get(
  "/",
  protect,
  adminMiddleware,
  getUsers
);

export default router;