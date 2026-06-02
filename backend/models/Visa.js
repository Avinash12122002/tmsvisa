import mongoose from "mongoose";

const visaSchema = new mongoose.Schema(
  {
    countryName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    fees: {
      type: Number,
      required: true,
    },

    processingDays: {
      type: Number,
      required: true,
    },

    visaType: {
      type: String,
      required: true,
    },

    issuedRecently: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Visa = mongoose.model("Visa", visaSchema);

export default Visa;