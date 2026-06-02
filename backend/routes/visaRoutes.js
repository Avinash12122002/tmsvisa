import express from "express";

import {
  createVisa,
  getVisas,
  updateVisa,
  deleteVisa,
} from "../controllers/visaController.js";

const router = express.Router();

router.post("/", createVisa);

router.get("/", getVisas);

router.put("/:id", updateVisa);

router.delete("/:id", deleteVisa);

export default router;
