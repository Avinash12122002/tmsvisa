import mongoose from "mongoose";

const jobApplicationSchema =
  new mongoose.Schema(
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      resume: {
        data: {
          type: Buffer,
          required: true,
        },

        fileName: {
          type: String,
          required: true,
        },

        contentType: {
          type: String,
          required: true,
        },
      },
    },
    {
      timestamps: true,
    }
  );

const JobApplication =
  mongoose.model(
    "JobApplication",
    jobApplicationSchema
  );

export default JobApplication;