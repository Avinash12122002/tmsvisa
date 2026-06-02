import Visa from "../models/Visa.js";

// CREATE VISA
export const createVisa = async (req, res) => {
  try {
    const visa = await Visa.create(req.body);

    res.status(201).json({
      success: true,
      visa,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL VISAS
export const getVisas = async (req, res) => {
  try {
    const visas = await Visa.find();

    res.status(200).json({
      success: true,
      visas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE VISA
export const updateVisa = async (req, res) => {
  try {
    const visa = await Visa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      visa,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE VISA
export const deleteVisa = async (req, res) => {
  try {
    await Visa.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Visa deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};