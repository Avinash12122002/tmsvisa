// These questions are shown on the AI Questions step of the form.
// They are designed to capture qualitative information that the
// scoring engine and Gemini AI use to refine the prediction.

const predictionQuestions = [
  {
    id: "q1",
    question:
      "Why do you want to visit this country, and what specific plans do you have during your stay (places to visit, events to attend, people to meet)?",
  },
  {
    id: "q2",
    question:
      "What are your strong ties to India that guarantee your return? (e.g. family responsibilities, property ownership, ongoing employment, business, pending commitments)",
  },
  {
    id: "q3",
    question:
      "How are you funding this trip? Please describe your financial situation — savings, income sources, and how you have prepared financially for this travel.",
  },
  {
    id: "q4",
    question:
      "Have you ever had a visa refused or faced any immigration issues? If yes, please explain what happened and what has changed since then.",
  },
  {
    id: "q5",
    question:
      "Describe your international travel experience. What countries have you visited, and did you always return on time? How does this trip fit into your travel history?",
  },
];

export default predictionQuestions;