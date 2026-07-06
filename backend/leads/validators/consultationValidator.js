export const validateConsultation = (req, res, next) => {
  const { name, whatsapp } = req.body;

  if (!name || !whatsapp) {
    return res.status(400).json({
      success: false,
      message: "Name and WhatsApp number are required",
    });
  }

  if (!/^\+?\d{2,15}$/.test(whatsapp)) {
    return res.status(400).json({
      success: false,
      message: "WhatsApp number must be Required",
    });
  }

  next();
};