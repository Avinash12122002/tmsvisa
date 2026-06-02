import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";
import Footer from "../../components/layout/Footer";

const mandatoryDocs = [
  {
    icon: "🧳",
    label: "Travel Itinerary",
    details:
      "Complete travel itinerary including flight details and travel plan.",
  },

  {
    icon: "🪪",
    label: "Pan Card",
    details: "Pan Card required for identity and family verification.",
  },

  {
    icon: "🏷️",
    label: "Visa Stamps",
    details: "Copies of previous visa stamps and travel history pages.",
  },

  {
    icon: "🛂",
    label: "Passport front and back pages",
    details: "Clear scanned copies of passport bio page and last page.",
  },

  {
    icon: "🪪",
    label: "Aadhaar card",
    details: "Government-issued Aadhaar card copy as address proof.",
  },

  {
    icon: "📝",
    label: "Cover letter",
    details: "Personal cover letter explaining the purpose of travel.",
  },
];

const conditionalDocs = [
  {
    icon: "💰",
    color: "#16A34A",
    label: "Funds",
    items: [
      "Bank balance certificate",
      "FD certificate",
      "Funds bank statement",
      "OR Pay After Visa Package",
    ],
  },

  {
    icon: "🧾",
    color: "#2563EB",
    label: "Tax Records",
    items: [
      "ITR current year",
      "ITR previous year",
      "OR Pay After Visa Package",
    ],
  },

  {
    icon: "🎓",
    color: "#7C3AED",
    label: "Student",
    items: [
      "Bonafide certificate",
      "Student ID card",
      "No objection certificate from institution",
      "Parent’s financial documents",
    ],
  },

  {
    icon: "💼",
    color: "#EA580C",
    label: "Employed",
    items: [
      "Employment proof",
      "Salary slips for last 3 months",
      "Leave approval letter",
      "Company ID card",
    ],
  },

  {
    icon: "🏢",
    color: "#0F766E",
    label: "Self Employed",
    items: [
      "Business registration certificate",
      "GST registration",
      "Business bank statement",
      "Income proof",
    ],
  },

  {
    icon: "💍",
    color: "#DB2777",
    label: "Married Applicants",
    items: [
      "Marriage certificate",
      "Spouse passport copy",
      "Joint bank statement (if applicable)",
    ],
  },

  {
    icon: "👴",
    color: "#475569",
    label: "Retired",
    items: ["Retirement proof", "Pension statement", "Financial proof"],
  },
];

function ChevronIcon({ open }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "0.25s ease",
      }}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocItem({ icon, label, details }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          padding: "18px 18px",
          background: "#fff",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontSize: 18,
            marginTop: 2,
          }}
        >
          {icon}
        </span>

        <span
          style={{
            flex: 1,
            fontSize: 15.5,
            fontWeight: 600,
            color: "#1e2a4a",
            lineHeight: 1.5,
          }}
        >
          {label}
        </span>

        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          style={{
            padding: "0 18px 18px 48px",
            background: "#f9fbff",
            fontSize: 14,
            color: "#5c6784",
            lineHeight: 1.7,
          }}
        >
          {details}
        </div>
      )}
    </div>
  );
}

function ConditionalSection({ icon, color, label, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderTop: "1px solid #dfe6f3",

        transition: "0.25s ease",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",

          display: "flex",

          alignItems: "center",

          padding: "20px 24px",

          border: "none",

          background: "#fff",

          cursor: "pointer",

          textAlign: "left",

          transition: "0.25s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            flex: 1,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: `${color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            {icon}
          </div>

          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#1d2947",
              }}
            >
              {label}
            </div>

            <div
              style={{
                fontSize: 13,
                color: "#64748B",
                marginTop: 4,
              }}
            >
              {items.length} document requirements
            </div>
          </div>
        </div>

        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          style={{
            padding:
              window.innerWidth < 768 ? "0 20px 20px" : "0 24px 20px 82px",
            background: "#f9fbff",
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "12px 0",

                fontSize: 14,

                color: "#475569",

                lineHeight: 1.7,

                borderBottom:
                  index !== items.length - 1 ? "1px dashed #d9e2f0" : "none",
              }}
            >
              ✓ {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const validCountries = [

  "australia",

  "canada",

  "dubai",

  "new-zealand",

  "united-kingdom",

  "usa",

  "united-states",
];

// ======================
// COUNTRY FLAGS
// ======================

const countryFlags = {

  australia: "AU",

  canada: "CA",

  "united-states": "US",

  dubai: "AE",

  "new-zealand": "NZ",

  "united-kingdom": "GB",
};

export default function CountryDescriptions() {
  const navigate = useNavigate();

  const { countryName } = useParams();

  const country =
  countryName
    ?.toLowerCase()
    ?.replaceAll("-", " ")
    ?.replace(
      /\b\w/g,
      (c) => c.toUpperCase()
    );

  const flagCode = countryFlags[countryName] || "AU";

  const rows = [];

  if (!validCountries.includes(countryName?.toLowerCase())){
  return (

    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        fontSize: 32,

        fontWeight: 700,

        color: "#1e293b",
      }}
    >
      Country Page Not Found
    </div>
  );
}

  for (let i = 0; i < mandatoryDocs.length; i += 3) {
    rows.push(mandatoryDocs.slice(i, i + 3));
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fc",
      }}
    >
      {/* TOP TITLE */}
      <div
        style={{
          textAlign: "center",
          padding: "32px 20px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 38px)",
            fontWeight: 700,
            color: "#18264b",
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: "-1px",
          }}
        >
          Essential Requirements for {country} Visa
        </h1>
        <p
          style={{
            marginTop: 16,
            color: "#64748B",
            fontSize: 15,
            lineHeight: 1.8,
            maxWidth: 760,
            marginInline: "auto",
          }}
        >
          Review all mandatory and conditional document requirements before
          starting your {country} visa application process.
        </p>
      </div>

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 20px 40px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 22,
            overflow: "hidden",
            border: "1px solid #dfe6f3",
            boxShadow: "0 2px 10px rgba(15,23,42,0.04)",
            backgroundClip: "padding-box",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              padding: "26px 30px",
              borderBottom: "1px solid #dfe6f3",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              background: "#fdfefe",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#162447",
                }}
              >
                Documents required for
              </h2>

              <img
                src={`https://flagsapi.com/${flagCode}/flat/64.png`}
                alt={country}
                style={{
                  width: 30,
                  height: 22,
                  borderRadius: 4,
                  objectFit: "cover",
                }}
              />

              <h2
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#162447",
                }}
              >
                {country} Visa
              </h2>
            </div>
          </div>

          {/* TITLE */}
          <div
            style={{
              padding: "18px 30px",
              background: "#f8fbff",
              borderTop: "1px solid #dfe6f3",
              borderBottom: "1px solid #dfe6f3",
              fontSize: 18,
              fontWeight: 700,
              color: "#1d2947",
            }}
          >
            Mandatory Documents
          </div>

          {/* DOC GRID */}
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                borderBottom: "1px solid #dfe6f3",
              }}
            >
              {row.map((doc, index) => (
                <div
                  key={index}
                  style={{
                    borderRight: index !== 2 ? "1px solid #dfe6f3" : "none",
                  }}
                >
                  <DocItem {...doc} />
                </div>
              ))}
            </div>
          ))}

          {/* CONDITIONAL */}
          {conditionalDocs.map((section, index) => (
            <ConditionalSection
              key={index}
              icon={section.icon}
              color={section.color}
              label={section.label}
              items={section.items}
            />
          ))}
        </div>
      </div>

      {/* CONTINUE BUTTON */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px 20px 60px",
          background: "#f4f7fc",
        }}
      >
        <button
          onClick={() => navigate(`/visa-form/${countryName}`)}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "16px 42px",
            borderRadius: 14,
            fontSize: 18,
            fontWeight: 700,
            cursor: "pointer",
            transition: "0.3s ease",
            boxShadow: "0 8px 20px rgba(37,99,235,0.25)",
          }}
        >
          Continue
        </button>
      </div>

      <Footer />
    </div>
  );
}
