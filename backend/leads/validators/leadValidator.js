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

  if (!/^\d{15}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be required",
    });
  }

  next();
};