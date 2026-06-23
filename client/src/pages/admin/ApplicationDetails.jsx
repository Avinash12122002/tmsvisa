import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";

import { getApplication } from "../../services/applicationService";

// ======================
// API URL
// ======================

const API = "https://tms-backend.tmsvisa.com/";

const BASE_URL =
  API.replace("/api", "")
     .replace(/\/$/, "");
// ======================
// SECTION
// ======================

const Section = ({ title, children }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

    <div className="space-y-4">{children}</div>
  </div>
);

// ======================
// ROW
// ======================

const Row = ({ label, value }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
    <div className="font-semibold text-gray-700">{label}</div>

    <div className="text-gray-900 break-words">{value ? value : "-"}</div>
  </div>
);

// ======================
// DOCUMENT CARD
// ======================

const DocumentCard = ({ label, file }) => {
  // ======================
  // NO FILE
  // ======================

  if (!file || file === "null" || file === null || file === "") {
    return (
      <div
        className="
          flex
          items-center
          justify-between
          p-6
          rounded-2xl
          border
          bg-gray-50
          mt-4
        "
      >
        <div>
          <h3
            className="
              text-xl
              font-semibold
            "
          >
            {label}
          </h3>

          <p className="text-gray-400">No File Uploaded</p>
        </div>
      </div>
    );
  }

  // ======================
  // FILE EXISTS
  // ======================

  return (
    <div
      className="
        flex
        items-center
        justify-between
        p-6
        rounded-2xl
        border
        bg-gray-50
        mt-4
      "
    >
      <div>
        <h3
          className="
            text-xl
            font-semibold
          "
        >
          {label}
        </h3>

        <p className="text-gray-500">Uploaded Document</p>
      </div>

      <div className="flex gap-4">
        {/* VIEW */}

        <a
          href={`${BASE_URL}/view/${file
            .replaceAll("\\", "/")
            .replace("uploads/", "")}`}
          target="_blank"
          rel="noreferrer"
          className="
    px-6
    py-3
    rounded-2xl
    bg-blue-600
    text-white
    font-semibold
    hover:bg-blue-700
    transition
  "
        >
          View
        </a>
        {/* DOWNLOAD */}

        <a
          href={`${BASE_URL}/download/${file
            .replaceAll("\\", "/")
            .replace("uploads/", "")}`}
          className="
    px-6
    py-3
    rounded-2xl
    bg-green-600
    text-white
    font-semibold
    hover:bg-green-700
    transition
  "
        >
          Download
        </a>
      </div>
    </div>
  );
};

// ======================
// MAIN COMPONENT
// ======================

const ApplicationDetails = () => {
  const { id } = useParams();

  const [application, setApplication] = useState(null);

  const [loading, setLoading] = useState(true);

  // ======================
  // FETCH APPLICATION
  // ======================

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
    try {
      const data = await getApplication(id);

      setApplication(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!application) {
    return <div className="p-10">Application Not Found</div>;
  }

  const d = application.formData;

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold">
                {application.applicantName}
              </h1>

              <p className="mt-2 text-blue-100">{application.applicationId}</p>
            </div>

            <div className="flex gap-4">
              <div className="bg-white/20 px-5 py-3 rounded-2xl">
                <div className="text-sm text-blue-100">Status</div>

                <div className="font-bold">{application.status}</div>
              </div>

              <div className="bg-white/20 px-5 py-3 rounded-2xl">
                <div className="text-sm text-blue-100">Country</div>

                <div className="font-bold">{application.country}</div>
              </div>
            </div>
          </div>
        </div>

        {/* VISA DETAILS */}

        <Section title="Visa Details">
          <Row label="Visa Start Date" value={d.visaStartDate} />

          <Row label="Visa End Date" value={d.visaEndDate} />
        </Section>

        {/* PASSPORT DETAILS */}

        <Section title="Passport Details">
          <Row label="First Name" value={d.firstName} />

          <Row label="Last Name" value={d.lastName} />

          <Row label="Passport Number" value={d.passportNumber} />

          <Row label="Gender" value={d.sex} />

          <Row label="Date Of Birth" value={d.dateOfBirth} />

          <Row label="Place Of Birth" value={d.placeOfBirth} />

          <Row label="Passport Date Of Issue" value={d.passportDateOfIssue} />

          <Row label="Passport Date Of Expiry" value={d.passportDateOfExpiry} />
        </Section>

        {/* PASSPORT DOCUMENTS */}

        <Section title="Passport Documents">
          <DocumentCard label="Passport Front" file={d.passportFront} />

          <DocumentCard label="Passport Back" file={d.passportBack} />
        </Section>

        {/* ========================================= */}
        {/* FUNDS */}
        {/* ========================================= */}

        <Section title="Funds Information">
          <Row label="Show Funds" value={d.showFunds} />

          {d.showFunds === "Yes" ? (
            <>
              {/* BANK BALANCE CERTIFICATE */}

              <DocumentCard
                label="Bank Balance Certificate"
                file={d.bankBalanceCertificate}
              />

              {/* FD CERTIFICATE */}

              <DocumentCard label="FD Certificate" file={d.fdCertificate} />

              {/* FUNDS BANK STATEMENT */}

              <DocumentCard
                label="Funds Bank Statement"
                file={d.fundsBankStatement}
              />
            </>
          ) : (
            <div
              className="
        mt-6
        p-8
        rounded-2xl
        border
        bg-gray-50
        text-gray-500
        text-lg
        font-medium
      "
            >
              Applicant selected Pay After Visa Package
            </div>
          )}
        </Section>
        {/* ========================================= */}
        {/* RETIREMENT */}
        {/* ========================================= */}

        <Section title="Retirement Information">
          <Row label="Retired" value={d.isRetired} />

          {d.isRetired === "Yes" ? (
            <>
              {/* RETIREMENT PROOF */}

              <DocumentCard label="Retirement Proof" file={d.retirementProof} />

              {/* PENSION STATEMENT */}

              <DocumentCard
                label="Pension Statement"
                file={d.pensionStatement}
              />
            </>
          ) : (
            <div
              className="
        mt-6
        p-8
        rounded-2xl
        border
        bg-gray-50
        text-gray-500
        text-lg
        font-medium
      "
            >
              Applicant is not retired
            </div>
          )}
        </Section>

        {/* ========================================= */}
        {/* STUDENT */}
        {/* ========================================= */}

        <Section title="Student Information">
          <Row label="Student" value={d.isStudent} />

          {d.isStudent === "Yes" ? (
            <>
              {/* BONAFIDE CERTIFICATE */}

              <DocumentCard
                label="Bonafide Certificate"
                file={d.bonafideCertificate}
              />

              {/* STUDENT ID CARD */}

              <DocumentCard label="Student ID Card" file={d.studentIdCard} />

              {/* STUDENT NOC */}

              <DocumentCard label="Student NOC" file={d.studentNoc} />

              {/* PARENT FINANCIAL DOCS */}

              <DocumentCard
                label="Parent Financial Docs"
                file={d.parentFinancialDocs}
              />
            </>
          ) : (
            <div
              className="
        mt-6
        p-8
        rounded-2xl
        border
        bg-gray-50
        text-gray-500
        text-lg
        font-medium
      "
            >
              Applicant is not a student
            </div>
          )}
        </Section>

        {/* ========================================= */}
        {/* EMPLOYMENT */}
        {/* ========================================= */}

        <Section title="Employment Information">
          <Row label="Employee" value={d.isEmployee} />

          {d.isEmployee === "Yes" ? (
            <>
              {/* EMPLOYEE TYPE */}

              <Row label="Employee Type" value={d.employeeType} />

              {/* PRIVATE EMPLOYEE */}

              {(d.employeeType === "Private" ||
                d.employeeType === "Government") && (
                <>
                  <DocumentCard
                    label="Employment Proof"
                    file={d.employmentProof}
                  />

                  <DocumentCard label="Salary Slips" file={d.salarySlips} />

                  <DocumentCard
                    label="Leave Approval Letter"
                    file={d.leaveApprovalLetter}
                  />

                  <DocumentCard
                    label="Company ID Card"
                    file={d.companyIdCard}
                  />
                </>
              )}

              {/* BUSINESS */}

              {d.employeeType === "Self Employed" && (
                <>
                  <DocumentCard
                    label="Business Registration"
                    file={d.businessRegistration}
                  />

                  <DocumentCard
                    label="GST Registration"
                    file={d.gstRegistration}
                  />

                  <DocumentCard
                    label="Business Bank Statement"
                    file={d.businessBankStatement}
                  />

                  <DocumentCard label="Income Proof" file={d.incomeProof} />
                </>
              )}
            </>
          ) : (
            <div
              className="
        mt-6
        p-8
        rounded-2xl
        border
        bg-gray-50
        text-gray-500
        text-lg
        font-medium
      "
            >
              Applicant is not employed
            </div>
          )}
        </Section>

        {/* ========================================= */}
        {/* TAX */}
        {/* ========================================= */}

        <Section title="Tax Information">
          <Row label="File Income Tax" value={d.fileIncomeTax} />

          {d.fileIncomeTax === "Yes" ? (
            <>
              {/* ITR CURRENT YEAR */}

              <DocumentCard label="ITR Current Year" file={d.itrCurrentYear} />

              {/* ITR PREVIOUS YEAR */}

              <DocumentCard
                label="ITR Previous Year"
                file={d.itrPreviousYear}
              />
            </>
          ) : (
            <div
              className="
        mt-6
        p-8
        rounded-2xl
        border
        bg-gray-50
        text-gray-500
        text-lg
        font-medium
      "
            >
              Applicant selected Pay After Visa for Tax Documents
            </div>
          )}
        </Section>

        {/* ========================================= */}
        {/* MARRIAGE */}
        {/* ========================================= */}

        <Section title="Marriage Information">
          <Row label="Married" value={d.isMarried} />

          {d.isMarried === "Yes" ? (
            <>
              {/* MARRIAGE CERTIFICATE */}

              <DocumentCard
                label="Marriage Certificate"
                file={d.marriageCertificate}
              />

              {/* SPOUSE PASSPORT */}

              <DocumentCard label="Spouse Passport" file={d.spousePassport} />

              {/* JOINT BANK STATEMENT */}

              <DocumentCard
                label="Joint Bank Statement"
                file={d.jointBankStatement}
              />
            </>
          ) : (
            <div
              className="
        mt-6
        p-8
        rounded-2xl
        border
        bg-gray-50
        text-gray-500
        text-lg
        font-medium
      "
            >
              Applicant is not married
            </div>
          )}
        </Section>

        {/* ========================================= */}
        {/* ADDITIONAL DOCUMENTS */}
        {/* ========================================= */}

        <Section title="Additional Documents">
          {/* ========================================= */}
          {/* PAY AFTER VISA LOGIC */}
          {/* ========================================= */}

          {d.payAfterVisaPackage === "Yes" ||
          d.taxPayAfterVisaPackage === "Yes" ||
          d.tripPayAfterVisaPackage === "Yes" ? (
            <div
              className="
        mb-6
        p-6
        rounded-2xl
        border
        bg-yellow-50
        text-yellow-800
        font-medium
      "
            >
              Travel Itinerary and Cover Letter are not required because
              applicant selected Pay After Visa service.
            </div>
          ) : (
            <>
              {/* TRAVEL ITINERARY */}

              <DocumentCard label="Travel Itinerary" file={d.travelItinerary} />

              {/* COVER LETTER */}

              <DocumentCard label="Cover Letter" file={d.coverLetter} />
            </>
          )}

          {/* ========================================= */}
          {/* ALWAYS REQUIRED */}
          {/* ========================================= */}

          <DocumentCard label="PAN Card" file={d.panCard} />

          <DocumentCard label="Visa Stamps" file={d.visaStamps} />

          <DocumentCard label="Aadhaar Card" file={d.aadhaarCard} />
        </Section>

        {/* PERSONAL */}

        <Section title="Personal Information">
          <Row label="Phone" value={d.phone} />

          <Row label="Email" value={d.email} />

          <Row
            label="Current Address Same As Passport"
            value={d.currentAddressSameAsPassport}
          />

          <Row
            label="Mailing Address Same As Current"
            value={d.mailingAddressSameAsCurrent}
          />

          <Row
            label="Duration At Current Residence"
            value={d.durationAtCurrentResidence}
          />

          <Row label="Purpose Of Visit" value={d.purposeOfVisit} />
          <Row
            label="Ever Known By Another Name"
            value={d.everKnownByAnotherName}
          />
          <Row label="Other Names" value={d.otherNames?.join(", ")} />
          <Row label="Other Nationality" value={d.otherNationality} />
          <Row
            label="Other Nationalities"
            value={d.otherNationalities?.join(", ")}
          />
        </Section>

        {/* ========================================= */}
        {/* FAMILY MEMBERS */}
        {/* ========================================= */}

        <Section title="Family Members">
          <Row label="Family Travelling" value={d.familyTravelling} />

          {d.familyTravelling === "Yes" ? (
            <div className="overflow-x-auto mt-6 rounded-2xl border">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left">Name</th>

                    <th className="p-4 text-left">Relationship</th>

                    <th className="p-4 text-left">DOB</th>
                  </tr>
                </thead>

                <tbody>
                  {d.familyMembers?.map((member, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-4">{member.name || "-"}</td>

                      <td className="p-4">{member.relationship || "-"}</td>

                      <td className="p-4">{member.dob || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              className="
        mt-6
        p-8
        rounded-2xl
        border
        bg-gray-50
        text-gray-500
        text-lg
        font-medium
      "
            >
              No Family Members Travelling
            </div>
          )}
        </Section>
        {/* ========================================= */}
        {/* COUNTRY CONTACTS */}
        {/* ========================================= */}

        <Section title={`${application.country} Contacts`}
>
          <Row
            label={`Friends / Relatives In ${application.country}`}
            value={d.friendsRelativesInCountry}
          />

          {d.friendsRelativesInCountry === "Yes" ? (
            <div className="overflow-x-auto mt-6 rounded-2xl border">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left">Name</th>

                    <th className="p-4 text-left">Passport Number</th>

                    <th className="p-4 text-left">DOB</th>
                  </tr>
                </thead>

                <tbody>
                  {d.countryContacts?.map((contact, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-4">{contact.name || "-"}</td>

                      <td className="p-4">{contact.passportNumber || "-"}</td>

                      <td className="p-4">{contact.dob || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              className="
        mt-6
        p-8
        rounded-2xl
        border
        bg-gray-50
        text-gray-500
        text-lg
        font-medium
      "
            >
              {`No Friends / Relatives In ${application.country}`}
            </div>
          )}
        </Section>

        {/* SPONSORSHIP */}

        <Section title="Sponsorship Information">
          <Row label="Trip Sponsor" value={d.tripSponsor} />

          {/* Family and Employer SPONSOR */}

          {(d.tripSponsor === "Family" || d.tripSponsor === "Employer") && (
            <>
              <DocumentCard label="Sponsor Letter" file={d.sponsorLetter} />

              <DocumentCard
                label="Sponsor Bank Statement"
                file={d.sponsorBankStatement}
              />

              <DocumentCard label="Sponsor ITR" file={d.sponsorItr} />

              <DocumentCard label="Sponsor ID Proof" file={d.sponsorIdProof} />
            </>
          )}

          {/* OVERSEAS RELATIVE */}

          {d.tripSponsor === "Overseas Relative" && (
            <>
              <DocumentCard
                label="Overseas Sponsor Letter"
                file={d.overseasSponsorLetter}
              />

              <DocumentCard
                label="Overseas Sponsor Bank Statement"
                file={d.overseasSponsorBankStatement}
              />

              <DocumentCard
                label="Overseas Tax Return"
                file={d.overseasTaxReturn}
              />

              <DocumentCard
                label="Overseas Relative Passport"
                file={d.overseasRelativePassport}
              />
            </>
          )}

          {/* PAY AFTER VISA */}

          {d.tripSponsor === "No Sponsor" && (
            <Row
              label="Trip Pay After Visa Package"
              value={d.tripPayAfterVisaPackage}
            />
          )}
        </Section>

        {/* ========================================= */}
        {/* TRAVEL HISTORY */}
        {/* ========================================= */}

        <Section title="Travel History">
          <Row
            label="Travelled Last 5 Years"
            value={d.travelHistoryLast5Years}
          />

          {/* YES */}

          {d.travelHistoryLast5Years === "Yes" ? (
            <div
              className="
        overflow-x-auto
        mt-6
        rounded-2xl
        border
      "
            >
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-5 text-left">Country</th>

                    <th className="p-5 text-left">From Date</th>

                    <th className="p-5 text-left">To Date</th>

                    <th className="p-5 text-left">Visa File</th>
                  </tr>
                </thead>

                <tbody>
                  {d.travelHistory?.map((travel, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-5">{travel.country || "-"}</td>

                      <td className="p-5">{travel.fromDate || "-"}</td>

                      <td className="p-5">{travel.toDate || "-"}</td>

                      <td className="p-5">
                        {travel.visaFile ? (
                          <div className="flex gap-3">
                            {/* VIEW */}

                            <a
                              href={`${BASE_URL}/view/${travel.visaFile
                                .replaceAll("\\", "/")
                                .replace("uploads/", "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="
                          px-4 py-2
                          rounded-xl
                          bg-blue-600
                          text-white
                        "
                            >
                              View
                            </a>

                            {/* DOWNLOAD */}

                            <a
                              href={`${BASE_URL}/download/${travel.visaFile
                                .replaceAll("\\", "/")
                                .replace("uploads/", "")}`}
                              className="
                          px-4 py-2
                          rounded-xl
                          bg-green-600
                          text-white
                        "
                            >
                              Download
                            </a>
                          </div>
                        ) : (
                          <span className="text-gray-400">No Visa File</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // NO HISTORY

            <div
              className="
        mt-6
        p-8
        rounded-2xl
        border
        bg-gray-50
        text-gray-500
        text-lg
        font-medium
      "
            >
              No Travel History
            </div>
          )}
        </Section>
        {/* ========================================= */}
        {/* VISA REFUSAL */}
        {/* ========================================= */}

        <Section title="Visa Refusal History">
          <Row label="Visa Denied" value={d.visaDenied} />

          {d.visaDenied === "Yes" ? (
            <Row
              label="Denied Countries"
              value={
                d.deniedCountries?.length ? d.deniedCountries.join(", ") : "-"
              }
            />
          ) : (
            <div
              className="
        mt-6
        p-8
        rounded-2xl
        border
        bg-gray-50
        text-gray-500
        text-lg
        font-medium
      "
            >
              No Visa Refusal History
            </div>
          )}
        </Section>
      </div>
    </AdminLayout>
  );
};

export default ApplicationDetails;
