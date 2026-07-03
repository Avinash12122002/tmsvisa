import Consultation from "../models/Consultation.js";

export const createConsultationService = async (data) => {
  const existing = await Consultation.findOne({
    whatsapp: data.whatsapp,
  });

  if (existing) {
    throw new Error(
      "You have already submitted your details. Our team will contact you shortly."
    );
  }

  return await Consultation.create(data);
};

export const getAllConsultationsService = async (filter = {}) => {
  return await Consultation.find(filter).sort({ createdAt: -1 });
};

export const getConsultationByIdService = async (id) => {
  return await Consultation.findById(id);
};

export const updateConsultationService = async (id, data) => {
  return await Consultation.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteConsultationService = async (id) => {
  return await Consultation.findByIdAndDelete(id);
};