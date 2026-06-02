import express from "express";

import validator from "../validators/jobValidator.js";

import {
  createJob,
  getJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

import protect from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes

router.get("/", getJobs);

router.get("/:id", getSingleJob);

// Protected Routes
// Add your existing auth middleware later if needed

router.post(
  "/",
  protect,
  validator,
  createJob
);

router.put(
  "/:id",
  protect,
  updateJob
);

router.delete(
  "/:id",
  protect,
  deleteJob
);

export default router;