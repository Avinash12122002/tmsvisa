import express from "express";

import {

  createApplication,

  getApplications,

  getApplication,

  updateApplicationStatus,

} from "../controllers/applicationController.js";

import protect from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router =
  express.Router();

// ======================
// FILE FIELDS
// ======================

const uploadFields = [

  { name: "passportFront", maxCount: 1 },

  { name: "passportBack", maxCount: 1 },

  { name: "bankBalanceCertificate", maxCount: 1 },

  { name: "fdCertificate", maxCount: 1 },

  { name: "fundsBankStatement", maxCount: 1 },

  { name: "retirementProof", maxCount: 1 },

  { name: "pensionStatement", maxCount: 1 },

  { name: "bonafideCertificate", maxCount: 1 },

  { name: "studentIdCard", maxCount: 1 },

  { name: "studentNoc", maxCount: 1 },

  { name: "parentFinancialDocs", maxCount: 1 },

  { name: "employmentProof", maxCount: 1 },

  { name: "salarySlips", maxCount: 1 },

  { name: "leaveApprovalLetter", maxCount: 1 },

  { name: "companyIdCard", maxCount: 1 },

  { name: "businessRegistration", maxCount: 1 },

  { name: "gstRegistration", maxCount: 1 },

  { name: "businessBankStatement", maxCount: 1 },

  { name: "incomeProof", maxCount: 1 },

  { name: "itrCurrentYear", maxCount: 1 },

  { name: "itrPreviousYear", maxCount: 1 },

  { name: "marriageCertificate", maxCount: 1 },

  { name: "spousePassport", maxCount: 1 },

  { name: "jointBankStatement", maxCount: 1 },

  { name: "travelItinerary", maxCount: 1 },

  { name: "coverLetter", maxCount: 1 },

  { name: "panCard", maxCount: 1 },

  { name: "visaStamps", maxCount: 1 },

  { name: "aadhaarCard", maxCount: 1 },

  { name: "sponsorLetter", maxCount: 1 },

  { name: "sponsorBankStatement", maxCount: 1 },

  { name: "sponsorItr", maxCount: 1 },

  { name: "sponsorIdProof", maxCount: 1 },

  { name: "overseasSponsorLetter", maxCount: 1 },

  { name: "overseasSponsorBankStatement", maxCount: 1 },

  { name: "overseasTaxReturn", maxCount: 1 },

  { name: "overseasRelativePassport", maxCount: 1 },

  // TRAVEL HISTORY VISA FILES

{ name: "travelVisaFile_0", maxCount: 1 },

{ name: "travelVisaFile_1", maxCount: 1 },

{ name: "travelVisaFile_2", maxCount: 1 },

{ name: "travelVisaFile_3", maxCount: 1 },

{ name: "travelVisaFile_4", maxCount: 1 },

{ name: "travelVisaFile_5", maxCount: 1 },
];

// ======================
// CREATE APPLICATION
// ======================

router.post(

  "/",

  protect,

  upload.fields(
    uploadFields
  ),

  createApplication
);

// ======================
// GET ALL
// ======================

router.get(

  "/",

  protect,

  adminMiddleware,

  getApplications
);

// ======================
// GET SINGLE
// ======================

router.get(

  "/:id",

  protect,

  adminMiddleware,

  getApplication
);

// ======================
// UPDATE STATUS
// ======================

router.patch(

  "/:id/status",

  protect,

  adminMiddleware,

  updateApplicationStatus
);

export default router;