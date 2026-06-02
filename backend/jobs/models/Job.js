import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    postingDate: {
      type: Date,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    countryCode: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model(
  "Job",
  jobSchema
);

export default Job;