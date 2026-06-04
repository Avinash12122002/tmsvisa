const jobValidator = (
  req,
  res,
  next
) => {
  const {
    postingDate,
    country,
    countryCode,
    title,
    description,
  } = req.body;

  if (
    !postingDate?.trim?.() ||
    !country?.trim?.() ||
    !countryCode?.trim?.() ||
    !title?.trim?.() ||
    !description?.trim?.()
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  next();
};

export default jobValidator;