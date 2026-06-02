const countryWeights = {
  // ======================
  // AUSTRALIA
  // ======================

  australia: {
    funds: 25,

    travelHistory: 20,

    occupation: 15,

    income: 20,

    maritalStatus: 5,

    previousRefusal: -25,

    ageBonus: 10,

    strongTies: 10,
  },

  // ======================
  // CANADA
  // ======================

  canada: {
    funds: 30,

    travelHistory: 15,

    occupation: 20,

    income: 20,

    maritalStatus: 5,

    previousRefusal: -30,

    ageBonus: 8,

    strongTies: 8,
  },

  // ======================
  // UNITED KINGDOM
  // ======================

  "united-kingdom": {
    funds: 20,

    travelHistory: 20,

    occupation: 15,

    income: 15,

    maritalStatus: 8,

    previousRefusal: -20,

    ageBonus: 10,

    strongTies: 12,
  },

  // ======================
  // NEW ZEALAND
  // ======================

  "new-zealand": {
    funds: 20,

    travelHistory: 25,

    occupation: 15,

    income: 15,

    maritalStatus: 5,

    previousRefusal: -20,

    ageBonus: 8,

    strongTies: 15,
  },
};

export default countryWeights;
