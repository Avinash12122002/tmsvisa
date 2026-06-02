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
    !postingDate ||
    !country ||
    !countryCode ||
    !title ||
    !description
  ) {
    return res.status(400).json({
      success: false,
      message: "All Fields Are Required",
    });
  }

  next();
};

export default jobValidator;