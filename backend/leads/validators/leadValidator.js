export const validateLead = (req, res, next) => {
  const {
    name,
    phone,
    service,
    email,
  } = req.body;

  if (!name || !phone || !service || !email) {
    return res.status(400).json({
      success: false,
      message:
        "Name, email, phone and service are required",
    });
  }

 if (!/^\+?\d{2,20}$/.test(phone)) {
  return res.status(400).json({
    success: false,
    message: "WhatsApp number must be Required",
  });
}


  next();
};