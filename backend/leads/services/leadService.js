import Lead from "../models/Lead.js";

export const createLeadService = async (leadData) => {

  const existingLead = await Lead.findOne({
    service: leadData.service,
    $or: [
      { email: leadData.email },
      { phone: leadData.phone },
    ],
  });

  if (existingLead) {
    throw new Error(
      `You have already submitted a ${leadData.service} enquiry`
    );
  }

  return await Lead.create(leadData);
};

export const getAllLeadsService = async (filter = {}) => {
  return await Lead.find(filter).sort({
    createdAt: -1,
  });
};

export const getLeadByIdService = async (id) => {
  return await Lead.findById(id);
};

export const updateLeadService = async (id, data) => {
  return await Lead.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteLeadService = async (id) => {
  return await Lead.findByIdAndDelete(id);
};