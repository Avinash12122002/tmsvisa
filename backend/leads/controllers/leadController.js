import {
  createLeadService,
  getAllLeadsService,
  getLeadByIdService,
  updateLeadService,
  deleteLeadService,
} from "../services/leadService.js";

export const createLead = async (req, res) => {
  try {

    const lead =
      await createLeadService(req.body);

    res.status(201).json({
      success: true,
      message:
        "Lead created successfully",
      data: lead,
    });

  } catch (error) {

    if (
      error.message.includes(
        "already exists"
      )
    ) {
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

export const getAllLeads = async (req, res) => {
  try {
    const { service, status } = req.query;

    const filter = {};

    if (service) filter.service = service;
    if (status) filter.status = status;

    const leads = await getAllLeadsService(filter);

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLeadById = async (req, res) => {
  try {
    const lead = await getLeadByIdService(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateLead = async (req, res) => {
  try {
    const lead = await updateLeadService(
      req.params.id,
      req.body
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const lead = await deleteLeadService(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};