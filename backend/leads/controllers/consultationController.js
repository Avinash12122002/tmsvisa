import {
  createConsultationService,
  getAllConsultationsService,
  getConsultationByIdService,
  updateConsultationService,
  deleteConsultationService,
} from "../services/consultationService.js";

export const createConsultation = async (req, res) => {
  try {
    const consultation = await createConsultationService(req.body);

    res.status(201).json({
      success: true,
      message: "Consultation request saved successfully",
      data: consultation,
    });
  } catch (error) {
    if (error.message.includes("already submitted")) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllConsultations = async (req, res) => {
  try {
    const { status, heading } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (heading) filter.heading = heading;

    const consultations = await getAllConsultationsService(filter);

    res.status(200).json({
      success: true,
      count: consultations.length,
      data: consultations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getConsultationById = async (req, res) => {
  try {
    const consultation = await getConsultationByIdService(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: consultation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateConsultation = async (req, res) => {
  try {
    const consultation = await updateConsultationService(
      req.params.id,
      req.body
    );

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Consultation updated successfully",
      data: consultation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteConsultation = async (req, res) => {
  try {
    const consultation = await deleteConsultationService(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Consultation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};