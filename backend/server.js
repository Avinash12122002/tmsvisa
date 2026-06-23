import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import visaRoutes from "./routes/visaRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import predictionRoutes from "./prediction/routes/predictionRoutes.js";

import jobRoutes from "./jobs/routes/jobRoutes.js";
import jobApplicationRoutes from "./jobs/routes/applicationRoutes.js";
import dashboardRoutes from "./jobs/routes/dashboardRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";
import leadRoutes from "./leads/routes/leadRoutes.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1);

// ======================
// DATABASE CONNECTION
// ======================

connectDB();

// ======================
// MIDDLEWARE
// ======================

// Parse JSON

app.use(
  express.json({
    limit: "50mb",
  }),
);

// Parse URL Encoded

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  }),
);

// Parse Cookies

app.use(cookieParser());

// Security Headers

app.use(helmet());

// ======================
// CORS
// ======================

app.use(
  cors({
    origin: [
      "https://app.tmsvisa.com",
      "https://tmsvisa.com",
      "https://www.tmsvisa.com",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// =====================================
// STATIC UPLOADS
// =====================================

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// =====================================
// VIEW FILE
// =====================================

app.get(
  "/view/:file",

  (req, res) => {
    const filePath = path.join(process.cwd(), "uploads", req.params.file);

    res.sendFile(filePath);
  },
);

// =====================================
// DOWNLOAD FILE
// =====================================

app.get(
  "/download/:file",

  (req, res) => {
    const filePath = path.join(process.cwd(), "uploads", req.params.file);

    res.download(filePath);
  },
);
// ======================
// RATE LIMITER
// ======================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 100,

  message: {
    success: false,

    message: "Too many requests from this IP. Please try again later.",
  },
});

app.use(limiter);

// ======================
// HEALTH CHECK ROUTE
// ======================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,

    message: "TMS VISA API Running Successfully",
  });
});

// ======================
// API ROUTES
// ======================

app.use("/api/auth", authRoutes);
// predictoin

app.use("/api/prediction", predictionRoutes);

app.use("/api/visas", visaRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/users", userRoutes);

// Job Portal Module

app.use("/api/jobs", jobRoutes);

app.use("/api/job-applications", jobApplicationRoutes);

app.use("/api/job-dashboard", dashboardRoutes);

app.use("/api/leads", leadRoutes);
// ======================
// 404 ROUTE HANDLER
// ======================

app.use((req, res) => {
  res.status(404).json({
    success: false,

    message: "Route Not Found",
  });
});

// ======================
// GLOBAL ERROR HANDLER
// ======================

app.use(errorHandler);

// ======================
// SERVER
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
