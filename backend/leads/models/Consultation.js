import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    whatsapp: {
      type: String,
      required: true,
      trim: true,
    },

    countryCode: {
      type: String,
      trim: true,
      default: "+61",
    },

    // Which of the 3 rotating popup headings the visitor saw when they submitted
    heading: {
      type: String,
      trim: true,
      enum: [
        "Book Your FREE Consultation"
      ],
    },

    // Page URL the popup was submitted from (useful for tracking)
    sourceUrl: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Converted"],
      default: "New",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Consultation", consultationSchema);