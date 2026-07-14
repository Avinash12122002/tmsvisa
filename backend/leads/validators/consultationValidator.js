export const validateConsultation = (req, res, next) => {
  const { name, email, whatsapp } = req.body;

  if (!name || !email || !whatsapp) {
    return res.status(400).json({
      success: false,
      message: "Name, Email and WhatsApp number are required",
    });
  }

  // Email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address",
    });
  }

  // WhatsApp validation
  if (!/^\+?\d{2,15}$/.test(whatsapp)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid WhatsApp number",
    });
  }

  next();
};