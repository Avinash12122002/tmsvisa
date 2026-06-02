import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    // Personal
    country:       { type: String, default: "" },
    firstName:     { type: String, default: "" },
    lastName:      { type: String, default: "" },
    age:           { type: String, default: "" },
    sex:           { type: String, default: "" },
    maritalStatus: { type: String, default: "" },

    // Employment
    occupation:   { type: String, default: "" },
    isEmployee:   { type: String, default: "" },
    employeeType: { type: String, default: "" },
    isStudent:    { type: String, default: "" },
    isRetired:    { type: String, default: "" },

    // Financial
    monthlyIncome:  { type: String, default: "" },
    bankBalance:    { type: String, default: "" },
    fileIncomeTax:  { type: String, default: "" },

    // Passport
    passportNumber:       { type: String, default: "" },
    passportDateOfExpiry: { type: String, default: "" },

    // Travel
    purposeOfVisit:          { type: String, default: "" },
    travelHistoryLast5Years: { type: String, default: "" },
    visaDenied:              { type: String, default: "" },

    // Sponsorship
    tripSponsor:               { type: String, default: "" },
    familyTravelling:          { type: String, default: "" },
    friendsRelativesInCountry: { type: String, default: "" },

    // Q&A
    questions: [
      {
        question: { type: String, default: "" },
        answer:   { type: String, default: "" },
      },
    ],

    // AI Result
    approvalChance: { type: Number, default: 0 },
    riskLevel:      { type: String, default: "Medium" },
    strengths:      { type: [String], default: [] },
    weaknesses:     { type: [String], default: [] },
    suggestions:    { type: [String], default: [] },
    aiAnalysis:     { type: String, default: "" },
  },
  { timestamps: true }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

export default Prediction;