import Prediction from "../models/Prediction.js";
import { generateVisaAnalysis } from "../services/geminiService.js";

// ══════════════════════════════════════════════
// CREATE PREDICTION
// POST /api/prediction/analyze
// ══════════════════════════════════════════════
export const createPrediction = async (req, res) => {
  try {
    const body = req.body;

    // Run AI analysis (Gemini + local fallback)
    const analysis = await generateVisaAnalysis(body);

    const prediction = await Prediction.create({
      // Personal
      firstName:    body.firstName,
      lastName:     body.lastName,
      age:          body.age,
      sex:          body.sex,
      maritalStatus: body.maritalStatus,
      country:      body.country,

      // Employment
      occupation:   body.occupation,
      isEmployee:   body.isEmployee,
      employeeType: body.employeeType,
      isStudent:    body.isStudent,
      isRetired:    body.isRetired,

      // Financial
      monthlyIncome:  body.monthlyIncome,
      bankBalance:    body.bankBalance,
      fileIncomeTax:  body.fileIncomeTax,

      // Passport
      passportNumber:       body.passportNumber,
      passportDateOfExpiry: body.passportDateOfExpiry,

      // Travel
      purposeOfVisit:          body.purposeOfVisit,
      travelHistoryLast5Years: body.travelHistoryLast5Years,
      visaDenied:              body.visaDenied,

      // Sponsorship
      tripSponsor:               body.tripSponsor,
      familyTravelling:          body.familyTravelling,
      friendsRelativesInCountry: body.friendsRelativesInCountry,

      // Q&A
      questions: body.questions,

      // AI Result
      approvalChance: analysis.approvalChance,
      riskLevel:      analysis.riskLevel,
      strengths:      analysis.strengths,
      weaknesses:     analysis.weaknesses,
      suggestions:    analysis.suggestions,
      aiAnalysis:     analysis.aiAnalysis,
    });

    res.status(201).json({ success: true, prediction });

  } catch (error) {
    console.error("[createPrediction]", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ══════════════════════════════════════════════
// GET SINGLE PREDICTION
// GET /api/prediction/:id
// ══════════════════════════════════════════════
export const getSinglePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findById(req.params.id);

    if (!prediction) {
      return res.status(404).json({ success: false, message: "Prediction not found" });
    }

    res.status(200).json({ success: true, prediction });

  } catch (error) {
    console.error("[getSinglePrediction]", error);
    res.status(500).json({ success: false, message: error.message });
  }
};