const riskLevels = (score) => {
  // ======================
  // LOW RISK
  // ======================

  if (score >= 80) {
    return {
      level: "Low",

      color: "bg-green-500",

      textColor: "text-green-700",

      bgColor: "bg-green-50",

      borderColor: "border-green-200",

      message:
        "Your profile looks strong with a high probability of visa approval.",
    };
  }

  // ======================
  // MEDIUM RISK
  // ======================

  if (score >= 60) {
    return {
      level: "Medium",

      color: "bg-yellow-500",

      textColor: "text-yellow-700",

      bgColor: "bg-yellow-50",

      borderColor: "border-yellow-200",

      message:
        "Your profile is moderate. Improving documentation can increase approval chances.",
    };
  }

  // ======================
  // HIGH RISK
  // ======================

  return {
    level: "High",

    color: "bg-red-500",

    textColor: "text-red-700",

    bgColor: "bg-red-50",

    borderColor: "border-red-200",

    message:
      "Your profile has higher rejection risk. Additional financial and travel proof is recommended.",
  };
};

export default riskLevels;
