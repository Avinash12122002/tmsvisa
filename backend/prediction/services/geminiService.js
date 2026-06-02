import Groq from "groq-sdk";

// ─────────────────────────────────────────────────────────────
// LOCAL SCORING ENGINE  (instant fallback if Groq unavailable)
// ─────────────────────────────────────────────────────────────
const localScore = (data) => {
  let score = 50;
  const strengths   = [];
  const weaknesses  = [];
  const suggestions = [];

  const income  = Number(data.monthlyIncome)           || 0;
  const balance = Number(data.bankBalance)             || 0;
  const age     = Number(data.age)                     || 0;
  const travels = Number(data.travelHistoryLast5Years) || 0;

  // ── 1. Monthly Income ──
  if (income >= 300000)      { score += 18; strengths.push("Exceptional monthly income (₹3L+) — top financial tier"); strengths.push("High income bracket significantly reduces financial risk perception"); }
  else if (income >= 200000) { score += 15; strengths.push("Strong monthly income (₹2L+) — well above embassy benchmarks"); strengths.push("High income bracket strengthens financial credibility"); }
  else if (income >= 100000) { score += 10; strengths.push("Solid monthly income (₹1L+) meets most embassy requirements"); }
  else if (income >= 50000)  { score += 5;  strengths.push("Monthly income meets minimum visa requirements"); weaknesses.push("Income is on the lower end — embassy may request additional proof"); }
  else if (income >= 25000)  { weaknesses.push("Low monthly income (under ₹25,000) — may raise concerns about trip affordability"); suggestions.push("Provide salary slips for 6+ months and an employer letter confirming stable income"); }
  else if (income > 0)       { score -= 8;  weaknesses.push("Very low income — embassy may question your ability to fund the trip"); suggestions.push("Document all supplementary income sources with supporting proof"); }

  // ── 2. Bank Balance ──
  if (balance >= 2000000)      { score += 22; strengths.push("Exceptional bank balance (₹20L+) — demonstrates outstanding financial standing"); strengths.push("6+ months of high-value bank statements available"); strengths.push("Sufficient funds to cover the trip multiple times over"); }
  else if (balance >= 1000000) { score += 18; strengths.push("High bank balance (₹10L+) — very strong financial indicator"); strengths.push("Bank statements will comfortably satisfy embassy requirements"); }
  else if (balance >= 500000)  { score += 13; strengths.push("Healthy bank balance (₹5L+) meets most embassy benchmarks"); strengths.push("Can comfortably cover travel, accommodation, and emergencies"); }
  else if (balance >= 200000)  { score += 7;  strengths.push("Adequate bank balance for short-term travel visas"); weaknesses.push("Balance may be borderline for longer trips or multiple-entry visas"); suggestions.push("Maintain a consistent average balance for 3–6 months before applying"); }
  else if (balance >= 50000)   { score -= 5;  weaknesses.push("Low bank balance (under ₹2L) — likely insufficient for most visa categories"); weaknesses.push("Embassy may view this as a financial risk"); suggestions.push("Build savings to at least ₹3–5L before applying, or arrange a strong co-sponsor"); }
  else if (balance > 0)        { score -= 12; weaknesses.push("Very low bank balance — high risk of visa rejection on financial grounds"); suggestions.push("Postpone application until you have at least 3 months of savings documented"); }

  // ── Savings ratio ──
  if (income > 0 && balance >= income * 12) strengths.push("Bank balance is 12x+ your monthly income — outstanding savings ratio");
  else if (income > 0 && balance >= income * 6) strengths.push("Bank balance is 6x+ monthly income — demonstrates strong saving habit");
  else if (income > 0 && balance > 0 && balance < income * 3) { weaknesses.push("Bank balance is low relative to income — embassy may question savings pattern"); suggestions.push("Ideally maintain 3–6x your monthly income in your bank account before applying"); }

  // ── 3. ITR ──
  if (data.fileIncomeTax === "Yes") { score += 10; strengths.push("Income Tax Returns (ITR) filed — strong proof of financial compliance"); strengths.push("ITR demonstrates legitimate, declared income to visa authorities"); }
  else { score -= 5; weaknesses.push("No ITR filed — embassies often require 2–3 years of tax records"); suggestions.push("File ITR for the last 2–3 years if eligible; it's one of the strongest financial documents"); }

  // ── 4. Employment ──
  if (data.isEmployee === "Yes") {
    score += 10; strengths.push("Currently employed — demonstrates strong home country ties");
    if (data.employeeType === "Government")         { score += 12; strengths.push("Government employee — one of the strongest employment profiles for visa approval"); strengths.push("Government jobs signal job security, stability, and strong return motivation"); }
    else if (data.employeeType === "Private")       { score += 7;  strengths.push("Private sector employment — employer letter and pay slips will strengthen your file"); suggestions.push("Get a detailed No Objection Certificate (NOC) from your employer on company letterhead"); }
    else if (data.employeeType === "Business")      { score += 8;  strengths.push("Business owner — provides strong financial independence signal"); suggestions.push("Submit business registration certificate, GST returns, and business bank statements"); }
    else if (data.employeeType === "Self Employed") { score += 5;  strengths.push("Self-employed with documented income"); suggestions.push("Provide CA-certified income proof, GST returns, and client contracts if possible"); }
  } else { score -= 8; weaknesses.push("Not currently employed — weaker home country ties"); }

  if (data.isStudent === "Yes") { score += 5; strengths.push("Student status — valid enrollment letter strengthens your application"); suggestions.push("Attach university enrollment letter, fee receipts, and leave approval from institution"); }
  if (data.isRetired === "Yes") { score += 6; strengths.push("Retired with pension — stable income and low immigration risk"); suggestions.push("Submit pension statements and proof of regular income for last 6 months"); }
  if (data.isEmployee !== "Yes" && data.isStudent !== "Yes" && data.isRetired !== "Yes") { score -= 10; weaknesses.push("Not currently employed or studying — embassy may view this as elevated immigration risk"); suggestions.push("Provide strong proof of property ownership or family ties to demonstrate intent to return"); }

  // ── 5. Travel History ──
  if (travels >= 10)     { score += 20; strengths.push("Extensive travel history (10+ countries) — exceptional visa track record"); strengths.push("Multiple prior visas demonstrate trustworthiness to visa officers"); strengths.push("Prior Schengen, US, or UK visas carry extra weight if applicable"); }
  else if (travels >= 6) { score += 16; strengths.push("Strong travel history (6–10 countries) — very positive visa signal"); strengths.push("Consistent travel pattern shows you always returned home on time"); }
  else if (travels >= 3) { score += 10; strengths.push("Good international travel experience (3–5 countries)"); strengths.push("Previous visa approvals reduce perceived risk for new applications"); }
  else if (travels >= 1) { score += 5;  strengths.push("Some international travel history — helpful but limited"); suggestions.push("Previous Schengen/US/UK visas if any should be highlighted in your application"); }
  else { score -= 5; weaknesses.push("No prior international travel — embassy has no travel track record to evaluate"); suggestions.push("Submit strong financial, employment, and property documents to compensate for lack of travel history"); }

  // ── 6. Visa Refusal ──
  if (data.visaDenied === "No")              { score += 8;  strengths.push("No prior visa refusals — clean visa history is a major positive"); }
  else if (data.visaDenied === "Yes - Once") { score -= 20; weaknesses.push("1 prior visa refusal — must be disclosed and addressed in application"); suggestions.push("Write a detailed cover letter explaining what has changed since the refusal"); suggestions.push("Significantly strengthen financial documents to overcome the prior refusal"); }
  else if (data.visaDenied === "Yes - Multiple") { score -= 35; weaknesses.push("2+ previous visa rejections — significantly impacts approval probability"); weaknesses.push("Multiple refusals are a serious red flag for visa officers"); suggestions.push("Consider consulting a certified immigration lawyer before reapplying"); suggestions.push("Address each refusal reason directly in a comprehensive cover letter"); }

  // ── 7. Age ──
  if (age >= 30 && age <= 55)   { score += 5; strengths.push("Age profile (30–55) is associated with stable, established applicants"); }
  else if (age >= 25)           { score += 2; strengths.push("Age demonstrates working professional maturity"); }
  else if (age > 0 && age < 25) { score -= 3; weaknesses.push("Young applicants (under 25) may face higher scrutiny for immigration intent"); suggestions.push("Strengthen proof of home country ties: family, property, studies, or employment"); }
  else if (age > 60)            { score += 3; strengths.push("Senior applicant age profile — typically seen as low immigration risk"); }

  // ── 8. Marital Status ──
  if (data.maritalStatus === "Married")   { score += 7; strengths.push("Married — spouse and family ties strengthen home country return motivation"); }
  else if (data.maritalStatus === "Single")   { score -= 2; weaknesses.push("Single applicants face slightly higher immigration risk perception"); suggestions.push("Provide strong property, employment, or financial ties to demonstrate intent to return"); }
  else if (data.maritalStatus === "Divorced") { suggestions.push("Include any dependent children or property ownership as home country ties"); }

  // ── 9. Trip Sponsor ──
  if (data.tripSponsor === "Self")         { score += 8; strengths.push("Self-funded trip — demonstrates full financial independence"); strengths.push("No dependency on third-party sponsorship reduces complexity of application"); }
  else if (data.tripSponsor === "Spouse")  { score += 5; strengths.push("Spouse-sponsored trip — family travel is viewed positively"); suggestions.push("Include spouse's income proof, bank statements, and relationship proof"); }
  else if (data.tripSponsor === "Company") { score += 7; strengths.push("Company-sponsored travel — strong business visa signal"); suggestions.push("Submit invitation letter from host company and employer sponsorship letter"); }
  else if (data.tripSponsor === "Parents") { score += 2; weaknesses.push("Parent-sponsored trips can raise questions about personal financial independence"); suggestions.push("Include parents' bank statements, ITR, and a signed sponsorship affidavit"); }
  else if (["Relative","Friend"].includes(data.tripSponsor)) { score -= 3; weaknesses.push("Third-party sponsorship (non-immediate family) requires extra documentation"); suggestions.push("Get a notarized sponsorship letter with bank statements from the sponsor"); }

  // ── 10. Purpose ──
  if (data.purposeOfVisit === "Tourism")       { score += 5; strengths.push("Tourism purpose — straightforward visa category with clear requirements"); }
  else if (data.purposeOfVisit === "Business") { score += 4; strengths.push("Business visit — invitation letter from host organisation strengthens the file"); suggestions.push("Obtain a formal invitation letter from the host company abroad"); }
  else if (data.purposeOfVisit === "Study")    { score += 3; strengths.push("Study purpose with institutional backing"); suggestions.push("Attach admission letter, fee payment proof, and accommodation arrangements"); }
  else if (data.purposeOfVisit === "Medical")  { score += 2; suggestions.push("Include medical appointment confirmation and hospital documents from destination"); }
  else if (data.purposeOfVisit === "Family Visit") { score -= 2; weaknesses.push("Family visit purpose requires strong proof of return and relationship documents"); suggestions.push("Provide host family's status proof, invitation letter, and relationship documents"); }

  // ── 11. Family Travelling ──
  if (data.familyTravelling === "Yes") { score += 6; strengths.push("Travelling with family — group travel reduces perceived immigration risk"); strengths.push("Family travel demonstrates genuine tourist intent"); }
  else { weaknesses.push("Solo travel requires stronger proof of return motivation to home country"); suggestions.push("Mention property, dependents, or work obligations that require your return"); }

  // ── 12. Friends/Relatives Abroad ──
  if (data.friendsRelativesInCountry === "No")              { score += 4; strengths.push("No close ties to destination country — lower immigration risk perception"); }
  else if (data.friendsRelativesInCountry === "Yes - Friends")   { score -= 3; weaknesses.push("Friends in destination country may be flagged as immigration risk"); suggestions.push("Demonstrate strong financial and family ties back home to offset this"); }
  else if (data.friendsRelativesInCountry === "Yes - Relatives") { score -= 6; weaknesses.push("Relatives in destination country — embassy may scrutinise immigration intent closely"); suggestions.push("Submit a strong cover letter explaining the temporary nature of your visit"); }
  else if (data.friendsRelativesInCountry === "Yes - Both")      { score -= 8; weaknesses.push("Both friends and relatives abroad — this is often a significant immigration concern"); suggestions.push("Provide compelling proof of home country ties: property, business, dependents, job"); }

  // ── 13. Passport Validity ──
  if (data.passportDateOfExpiry) {
    const monthsLeft = (new Date(data.passportDateOfExpiry) - new Date()) / (1000 * 60 * 60 * 24 * 30);
    if (monthsLeft >= 24)      { score += 5; strengths.push("Passport valid for 2+ years — excellent validity for visa applications"); }
    else if (monthsLeft >= 12) { score += 3; strengths.push("Passport validity is sufficient for most visa categories"); }
    else if (monthsLeft >= 6)  { suggestions.push("Passport has 6–12 months left — renew soon, many countries require 6 months beyond travel dates"); }
    else if (monthsLeft > 0)   { score -= 10; weaknesses.push("Passport expiring soon — likely to cause visa rejection"); suggestions.push("Renew your passport immediately before applying for any visa"); }
    else                       { score -= 20; weaknesses.push("Passport has already expired — cannot apply for any visa"); }
  }

  suggestions.push("Prepare a clear travel itinerary with hotel bookings and return flight confirmation");
  suggestions.push("Maintain a clean and consistent bank account — avoid large unexplained cash deposits before applying");

  score = Math.min(96, Math.max(5, score));
  const riskLevel = score >= 80 ? "Low" : score >= 60 ? "Medium" : "High";
  const topStrengths  = strengths.slice(0, 3).join(", ").toLowerCase();
  const topWeaknesses = weaknesses.slice(0, 2).join(" and ").toLowerCase();
  const aiAnalysis = `Based on a comprehensive analysis of your application for ${data.country || "the destination country"}, your profile scores ${score}% approval probability with a ${riskLevel.toLowerCase()} risk classification.\n\nYour application is supported by ${topStrengths || "your submitted profile data"}${topWeaknesses ? `, however it is held back by ${topWeaknesses}` : ""}.\n\n${score >= 80 ? "Your profile is strong. Submit with complete documentation and a well-crafted cover letter." : score >= 60 ? "Your profile is moderate. Focus on strengthening financial documents and home country ties before applying." : "Your profile needs significant improvement. Address the key weaknesses identified and consider delaying your application."}`;

  return { approvalChance: score, riskLevel, strengths, weaknesses, suggestions, aiAnalysis };
};

// ─────────────────────────────────────────────────────────────
// GROQ AI ENHANCEMENT
// Model: llama-3.3-70b-versatile (free, very fast)
// ─────────────────────────────────────────────────────────────
export const generateVisaAnalysis = async (data) => {
  // Always run local first — never fails
  const local = localScore(data);

  if (!process.env.GROQ_API_KEY) {
    console.warn("[Groq] No GROQ_API_KEY set — using local scoring engine");
    return local;
  }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

//     const prompt = `You are a senior visa officer with 20 years of experience assessing Indian passport holders for visas to ${data.country}.

// Analyze this applicant and return a refined assessment. Respond with ONLY valid JSON — no markdown, no explanation.

// APPLICANT:
// Country: ${data.country}
// Name: ${data.firstName} ${data.lastName} | Age: ${data.age} | Gender: ${data.sex} | Marital: ${data.maritalStatus}
// Occupation: ${data.occupation}
// Employment: ${data.isEmployee === "Yes" ? `Employed — ${data.employeeType}` : data.isStudent === "Yes" ? "Student" : data.isRetired === "Yes" ? "Retired" : "Unemployed"}
// Monthly Income: Rs.${Number(data.monthlyIncome).toLocaleString()}
// Bank Balance: Rs.${Number(data.bankBalance).toLocaleString()}
// Files ITR: ${data.fileIncomeTax}
// Passport Expiry: ${data.passportDateOfExpiry}
// Purpose: ${data.purposeOfVisit}
// Countries Visited (5yr): ${data.travelHistoryLast5Years}
// Visa Refusal History: ${data.visaDenied}
// Trip Sponsor: ${data.tripSponsor}
// Family Travelling: ${data.familyTravelling}
// Friends/Relatives in ${data.country}: ${data.friendsRelativesInCountry}

// WRITTEN ANSWERS:
// ${(data.questions || []).map((q, i) => `Q${i + 1}: ${q.question}\nA: ${q.answer || "(not answered)"}`).join("\n\n")}

// PRELIMINARY SCORE (local engine): ${local.approvalChance}% — ${local.riskLevel} risk

// RULES:
// - Adjust score ±15 based on written answer quality
// - strengths: 4-8 specific items
// - weaknesses: 2-6 specific items
// - suggestions: 4-8 actionable items
// - aiAnalysis: 3-4 professional sentences with specific data references
// - riskLevel: Low(80+), Medium(60-79), High(below 60)

// Return this exact JSON structure:
// {
//   "approvalChance": <number 5-96>,
//   "riskLevel": "<Low|Medium|High>",
//   "strengths": ["<item>"],
//   "weaknesses": ["<item>"],
//   "suggestions": ["<item>"],
//   "aiAnalysis": "<narrative>"
    // }`;
    
    const prompt = `
You are a Senior Immigration Risk Analyst and Visa Officer with 20+ years of experience assessing visa applications for ${data.country} Australia, Canada, New Zealand, United Kingdom, Schengen countries, and the United States.

Your task is to assess the applicant's visa approval probability professionally and objectively.

IMPORTANT:

- Think like a real visa officer.
- Assess immigration risk.
- Assess financial stability.
- Assess employment stability.
- Assess travel history.
- Assess home-country ties.
- Assess likelihood of returning home.
- Detect suspicious, weak, generic, or contradictory answers.
- Do NOT automatically approve because of high income.
- Do NOT automatically reject because of low income.
- Evaluate the complete profile.

==================================================
APPLICANT PROFILE
==================================================

Destination Country:
${data.country}

Full Name:
${data.firstName} ${data.lastName}

Age:
${data.age}

Gender:
${data.sex}

Marital Status:
${data.maritalStatus}

Occupation:
${data.occupation}

Employment Status:
${
  data.isEmployee === "Yes"
    ? `Employed (${data.employeeType})`
    : data.isStudent === "Yes"
    ? "Student"
    : data.isRetired === "Yes"
    ? "Retired"
    : "Unemployed"
}

Monthly Income:
₹${Number(data.monthlyIncome || 0).toLocaleString()}

Bank Balance:
₹${Number(data.bankBalance || 0).toLocaleString()}

Income Tax Filed:
${data.fileIncomeTax}

Passport Expiry:
${data.passportDateOfExpiry}

Purpose Of Visit:
${data.purposeOfVisit}

Travel History (Last 5 Years):
${data.travelHistoryLast5Years}

Previous Visa Refusals:
${data.visaDenied}

Trip Sponsor:
${data.tripSponsor}

Family Travelling:
${data.familyTravelling}

Friends/Relatives In Destination Country:
${data.friendsRelativesInCountry}

==================================================
WRITTEN ANSWERS
==================================================

${(data.questions || [])
  .map(
    (q, i) =>
      `Question ${i + 1}: ${q.question}
Answer: ${q.answer || "(Not Answered)"}`
  )
  .join("\n\n")}

==================================================
LOCAL ENGINE RESULT
==================================================

Approval Chance:
${local.approvalChance}%

Risk Level:
${local.riskLevel}

==================================================
INSTRUCTIONS
==================================================

1. Review the complete profile.
2. Evaluate financial strength.
3. Evaluate employment stability.
4. Evaluate travel history credibility.
5. Evaluate sponsorship strength.
6. Evaluate written answers.
7. Identify strengths.
8. Identify weaknesses.
9. Identify immigration risks.
10. Adjust local score by maximum ±10 points.
11. Final score must stay between 5 and 96.
12. Determine risk level:

Low = 80-96
Medium = 60-79
High = Below 60

==================================================
RETURN ONLY VALID JSON
==================================================

{
  "approvalChance": 0,
  "riskLevel": "Low",
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "aiAnalysis": ""
}

==================================================
QUALITY REQUIREMENTS
==================================================

approvalChance:
- Integer between 5 and 96

strengths:
- 5 to 8 specific strengths

weaknesses:
- 2 to 6 realistic concerns

suggestions:
- 5 to 8 actionable recommendations

aiAnalysis:
- 120 to 250 words
- Mention financial profile
- Mention employment profile
- Mention travel history
- Mention purpose of visit
- Mention strengths
- Mention concerns
- Explain approval reasoning

Return ONLY JSON.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 2500,
    });

    const text    = completion.choices[0]?.message?.content || "";
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();

    // Extract JSON if there's extra text around it
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");

    const parsed = JSON.parse(jsonMatch[0]);

    if (!parsed.approvalChance || !parsed.riskLevel || !parsed.aiAnalysis) {
      throw new Error("Incomplete response structure");
    }

    console.log(`[Groq] Analysis complete — ${parsed.approvalChance}% (${parsed.riskLevel} risk)`);
    return parsed;

  } catch (error) {
    console.error("[Groq] Error:", error.message, "— falling back to local engine");
    return local;
  }
};