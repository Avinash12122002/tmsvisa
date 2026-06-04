import express from "express";

import protect from "../../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";

import {
  applyJob,
  getApplications,
  deleteApplication,
  getResume,
} from "../controllers/applicationController.js";

const router = express.Router();

// Public

router.post(
  "/apply",
  upload.single("resume"),
  applyJob
);

// Admin

router.get(
  "/",
  protect,
  getApplications
);

router.get(
  "/resume/:id",
  getResume
);

router.delete(
  "/:id",
  protect,
  deleteApplication
);

export default router;