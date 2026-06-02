const generateApplicationId = (
  country = ""
) => {

  const random =
    Math.floor(
      1000 +
      Math.random() * 9000
    );

  // ======================
  // COUNTRY CODES
  // ======================

  const countryCodes = {

    Australia: "AUS",

    Canada: "CAN",

    Dubai: "UAE",

    USA: "USA",

    "United States": "USA",

    "United Kingdom": "UK",

    "New Zealand": "NZ",
  };

  // ======================
  // COUNTRY CODE
  // ======================

  const countryCode =

    countryCodes[country]

    ||

    "VISA";

  // ======================
  // APPLICATION ID
  // ======================

  return `${countryCode}-${Date.now()}-${random}`;
};

export default generateApplicationId;