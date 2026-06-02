import express from "express";

import protect from "../../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";

import {
  applyJob,
  getApplications,
  deleteApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post(
  "/apply",
  upload.single("resume"),
  applyJob
);

router.get(
  "/",
  protect,
  getApplications
);

router.delete(
  "/:id",
  protect,
  deleteApplication
);

export default router;