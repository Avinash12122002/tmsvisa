import express from "express";
import {
  createPrediction,
  getSinglePrediction,
} from "../controllers/predictionController.js";

const router = express.Router();

// POST /api/prediction/analyze  — create + run AI
router.post("/analyze", createPrediction);

// GET  /api/prediction/:id      — fetch saved result
router.get("/:id", getSinglePrediction);

export default router;