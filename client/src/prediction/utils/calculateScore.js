const calculateScore = (data) => {
  let score = 50;

  // ======================
  // AGE
  // ======================

  const age = Number(data.age);

  if (age >= 25 && age <= 40) {
    score += 10;
  } else if (age > 40) {
    score += 5;
  }

  // ======================
  // BANK BALANCE
  // ======================

  const bankBalance = Number(data.bankBalance);

  if (bankBalance >= 1000000) {
    score += 20;
  } else if (bankBalance >= 500000) {
    score += 12;
  } else if (bankBalance >= 200000) {
    score += 5;
  } else {
    score -= 10;
  }

  // ======================
  // MONTHLY INCOME
  // ======================

  const monthlyIncome = Number(data.monthlyIncome);

  if (monthlyIncome >= 200000) {
    score += 15;
  } else if (monthlyIncome >= 100000) {
    score += 10;
  } else if (monthlyIncome >= 50000) {
    score += 5;
  } else {
    score -= 5;
  }

  // ======================
  // TRAVEL HISTORY
  // ======================

  if (data.travelHistory === "Yes") {
    score += 12;
  } else {
    score -= 5;
  }

  // ======================
  // PREVIOUS REFUSAL
  // ======================

  if (data.previousRefusal === "Yes") {
    score -= 25;
  }

  // ======================
  // MARITAL STATUS
  // ======================

  if (data.maritalStatus === "Married") {
    score += 5;
  }

  // ======================
  // OCCUPATION
  // ======================

  const occupation = data.occupation?.toLowerCase();

  if (occupation?.includes("engineer")) {
    score += 8;
  }

  if (occupation?.includes("government")) {
    score += 10;
  }

  if (occupation?.includes("business")) {
    score += 7;
  }

  if (occupation?.includes("student")) {
    score -= 3;
  }

  // ======================
  // PURPOSE OF VISIT
  // ======================

  const purpose = data.purposeOfVisit?.toLowerCase();

  if (purpose?.includes("tourism")) {
    score += 5;
  }

  if (purpose?.includes("business")) {
    score += 8;
  }

  if (purpose?.includes("study")) {
    score += 5;
  }

  // ======================
  // AI QUESTION ANALYSIS
  // ======================

  if (data.questions?.length) {
    data.questions.forEach((item) => {
      const answer = item.answer?.toLowerCase();

      // STRONG ANSWERS

      if (answer?.includes("family")) {
        score += 2;
      }

      if (answer?.includes("job")) {
        score += 2;
      }

      if (answer?.includes("business")) {
        score += 2;
      }

      // WEAK ANSWERS

      if (answer?.includes("permanent")) {
        score -= 8;
      }

      if (answer?.includes("settle")) {
        score -= 10;
      }
    });
  }

  // ======================
  // COUNTRY BONUS
  // ======================

  if (data.country === "canada") {
    score += 2;
  }

  if (data.country === "australia") {
    score += 3;
  }

  // ======================
  // LIMIT SCORE
  // ======================

  if (score > 98) {
    score = 98;
  }

  if (score < 5) {
    score = 5;
  }

  return Math.round(score);
};

export default calculateScore;
