import mongoose from "mongoose";

const applicationSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
          ref: "tmsvisas",
      },
      applicationId: {
        type: String,
        required: true,
      },

      applicantName: String,

      email: String,

      phone: String,

      passportNumber:
        String,

      country: String,

      status: {
        type: String,

        enum: [
          "Pending",
          "Under Review",
          "Approved",
          "Rejected",
          "Completed",
        ],

        default: "Pending",
      },

      paymentStatus: {
        type: String,

        enum: [
          "Pending",
          "Paid",
          "Refunded",
        ],

        default: "Pending",
      },

      progress: {
        type: Number,

        default: 0,
      },

      formData: {
        type: Object,

        required: true,
      },
    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Application",
  applicationSchema
);