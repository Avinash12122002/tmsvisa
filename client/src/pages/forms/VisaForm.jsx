import { useState, useRef, useCallback, useMemo, useEffect } from "react";

import { useParams } from "react-router-dom";

import { createApplication } from "../../services/applicationService";

const STEPS = [
  { id: 1, label: "Travel Dates", short: "Dates" },

  { id: 2, label: "Passport Details", short: "Passport" },

  { id: 3, label: "Funds Verification", short: "Funds" },

  { id: 4, label: "Retirement Documents", short: "Retired" },

  { id: 5, label: "Student Documents", short: "Student" },

  { id: 6, label: "Employment Documents", short: "Employee" },

  { id: 7, label: "Tax Documents", short: "Tax" },

  { id: 8, label: "Marriage Documents", short: "Married" },

  { id: 9, label: "Personal Information", short: "Personal" },

  { id: 10, label: "Trip Sponsorship", short: "Sponsor" },

  { id: 11, label: "Travel History", short: "History" },

  { id: 12, label: "Supporting Documents", short: "Documents" },

  { id: 13, label: "Review & Submit", short: "Review" },
];

const initialFormData = {
  visaStartDate: "",
  visaEndDate: "",

  passportFront: null,
  passportBack: null,
  firstName: "",
  lastName: "",
  passportNumber: "",
  sex: "",
  dateOfBirth: "",
  placeOfBirth: "",
  passportDateOfIssue: "",
  passportDateOfExpiry: "",

  showFunds: "",
  payAfterVisaPackage: "",
  bankBalanceCertificate: null,
  fdCertificate: null,
  fundsBankStatement: null,

  isRetired: "",
  retirementProof: null,
  pensionStatement: null,

  isStudent: "",
  bonafideCertificate: null,
  studentIdCard: null,
  studentNoc: null,
  parentFinancialDocs: null,

  isEmployee: "",
  employeeType: "",
  employmentProof: null,
  salarySlips: null,
  leaveApprovalLetter: null,
  companyIdCard: null,
  businessRegistration: null,
  gstRegistration: null,
  businessBankStatement: null,
  incomeProof: null,

  fileIncomeTax: "",
  taxPayAfterVisaPackage: "",
  itrCurrentYear: null,
  itrPreviousYear: null,

  isMarried: "",
  marriageCertificate: null,
  spousePassport: null,
  jointBankStatement: null,

  phone: "",
  email: "",
  currentAddressSameAsPassport: "",
  mailingAddressSameAsCurrent: "",
  durationAtCurrentResidence: "",
  purposeOfVisit: "",
  everKnownByAnotherName: "",
  otherNames: [""],
  otherNationality: "",
  otherNationalities: [""],
  familyTravelling: "",
  familyMembers: [
    {
      name: "",
      relationship: "",
      dob: "",
    },
  ],
  friendsRelativesInCountry: "",
  countryContacts: [
    {
      name: "",
      passportNumber: "",
      dob: "",
    },
  ],

  tripSponsor: "",
  sponsorLetter: null,
  sponsorBankStatement: null,
  sponsorItr: null,
  sponsorIdProof: null,
  overseasSponsorLetter: null,
  overseasSponsorBankStatement: null,
  overseasTaxReturn: null,
  overseasRelativePassport: null,
  tripPayAfterVisaPackage: "",

  travelHistoryLast5Years: "",
  travelHistory: [
    {
      country: "",
      fromDate: "",
      toDate: "",
      visaFile: null,
    },
  ],

  visaDenied: "",
  deniedCountries: [""],

  travelItinerary: null,
  coverLetter: null,
  panCard: null,
  visaStamps: null,
  aadhaarCard: null,
};

const C = {
  primary: "#1B4FD8",
  primaryLight: "#EEF2FF",
  primaryMid: "#6B85E8",
  accent: "#0EA5E9",
  success: "#059669",
  successLight: "#ECFDF5",
  warn: "#D97706",
  warnLight: "#FFFBEB",
  error: "#DC2626",
  text: "#0F172A",
  textMid: "#475569",
  textLight: "#94A3B8",
  border: "#E2E8F0",
  borderFocus: "#1B4FD8",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  locked: "#F1F5F9",
};

function UploadBox({
  label,
  number,
  field,
  value,
  onUpload,
  hint,
  loading,
  disabled,
}) {
  const ref = useRef();

  const [drag, setDrag] = useState(false);

  const previewUrl = useMemo(() => {
    if (!value) return null;

    return URL.createObjectURL(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFile = (f) => {
    onUpload(field, f);
  };

  return (
    <div style={{ marginBottom: 14 }}>
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 7,
        }}
      >
        {number && (
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: value ? C.success : C.primary,
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {value ? "✓" : number}
          </span>
        )}

        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: C.text,
          }}
        >
          {label}
        </span>

        {hint && (
          <div
            style={{
              width: "100%",
              marginLeft: 28,
              marginTop: -2,
              fontSize: 11,
              color: C.textLight,
              lineHeight: 1.5,
            }}
          >
            {hint}
          </div>
        )}
      </div>

      {/* UPLOAD AREA */}

      <div
        onClick={() => {
          if (!value && !disabled) {
            ref.current.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();

          if (disabled) return;

          setDrag(false);

          const file = e.dataTransfer.files[0];

          if (!file) return;

          handleFile(file);
        }}
        style={{
          border: `2px dashed ${
            drag ? C.primary : value ? "#2563EB" : C.border
          }`,

          borderRadius: 14,

          padding: value ? 14 : "18px 16px",

          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : value ? "default" : "pointer",

          background: drag ? C.primaryLight : value ? "#fff" : C.bg,

          transition: "all 0.2s",

          position: "relative",

          overflow: "hidden",
        }}
      >
        {/* LOADING */}

        {loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.92)",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              fontSize: 13,
              color: C.primary,
              fontWeight: 700,
              gap: 8,

              zIndex: 10,
            }}
          >
            <span
              style={{
                display: "inline-block",
                animation: "spin 0.8s linear infinite",
              }}
            >
              ◌
            </span>
            Uploading document…
          </div>
        )}

        {/* FILE EXISTS */}

        {value ? (
          <div>
            {/* IMAGE PREVIEW */}

            {value.type?.includes("image") && (
              <img
                src={previewUrl}
                alt="preview"
                style={{
                  width: "100%",
                  maxHeight: 150,
                  objectFit: "contain",
                  borderRadius: 10,
                  marginBottom: 16,
                }}
              />
            )}

            {/* PDF PREVIEW */}

            {value.type === "application/pdf" && (
              <iframe
                src={previewUrl}
                title="PDF Preview"
                style={{
                  width: "100%",
                  height: 150,
                  border: "none",
                  borderRadius: 10,
                  marginBottom: 16,
                }}
              />
            )}

            {/* FILE INFO */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: "#D1FAE5",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  fontSize: 20,

                  flexShrink: 0,
                }}
              >
                ✅
              </div>

              <div
                style={{
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: C.success,

                    wordBreak: "break-word",
                  }}
                >
                  {value.name}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: C.success,
                    marginTop: 2,
                  }}
                >
                  File uploaded successfully ✓
                </div>
              </div>
            </div>

            {/* ACTIONS */}

            <div
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              {/* REUPLOAD */}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  ref.current.click();
                }}
                style={{
                  flex: 1,
                  padding: "11px 14px",

                  borderRadius: 10,

                  border: "1px solid #BFDBFE",

                  background: "#EFF6FF",

                  color: "#2563EB",

                  fontWeight: 700,

                  cursor: "pointer",

                  fontSize: 14,
                }}
              >
                🔄 Reupload
              </button>

              {/* REMOVE */}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  handleFile(null);

                  ref.current.value = "";
                }}
                style={{
                  flex: 1,
                  padding: "11px 14px",

                  borderRadius: 10,

                  border: "none",

                  background: "#FEF2F2",

                  color: "#DC2626",

                  fontWeight: 700,

                  cursor: "pointer",

                  fontSize: 14,
                }}
              >
                🗑 Remove
              </button>
            </div>
          </div>
        ) : (
          /* EMPTY STATE */

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,

                background: C.primaryLight,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                fontSize: 18,

                flexShrink: 0,
              }}
            >
              📎
            </div>

            <div
              style={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.primary,
                }}
              >
                Click or drag file here
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: C.textLight,
                  marginTop: 2,
                }}
              >
                JPEG, PNG or PDF · max 2 MB
              </div>
            </div>
            {!disabled && (
              <div
                style={{
                  padding: "5px 12px",
                  borderRadius: 7,

                  background: C.primaryLight,

                  color: C.primary,

                  fontSize: 12,
                  fontWeight: 700,

                  flexShrink: 0,
                }}
              >
                Browse
              </div>
            )}
          </div>
        )}
      </div>

      {/* INPUT */}

      <input
        ref={ref}
        type="file"
        accept="image/*,.pdf"
        disabled={disabled}
        style={{
          display: "none",
        }}
        onChange={(e) => {
          if (disabled) return;

          const file = e.target.files[0];

          if (!file) return;

          handleFile(file);

          e.target.value = "";
        }}
      />
    </div>
  );
}

function Field({
  label,
  value,
  prefix,
  onChange,
  required,
  disabled,
  placeholder,
  type = "text",
  error,
}) {
  const locked = disabled;

  const [focused, setFocused] = useState(false);

  return (
    <div
      style={{
        marginBottom: 14,
        flex: 1,
      }}
    >
      {/* LABEL */}

      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 700,
          color: locked ? C.textLight : C.textMid,
          marginBottom: 5,
          letterSpacing: 0.5,
          textTransform: "uppercase",
        }}
      >
        {label}

        {required && (
          <span
            style={{
              color: C.error,
              marginLeft: 3,
            }}
          >
            *
          </span>
        )}
      </label>

      {/* INPUT WRAPPER */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: 8,
          overflow: "hidden",
          border: `1.5px solid ${
            error ? C.error : focused ? C.borderFocus : C.border
          }`,
          background: locked ? C.locked : C.card,
          transition: "all 0.15s",
          boxShadow:
            focused && !locked ? `0 0 0 3px ${C.primaryLight}` : "none",
        }}
      >
        {/* PREFIX */}

        {prefix && (
          <div
            style={{
              padding: "0 14px",
              height: 42,
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              background: "#F3F4F6",
              color: C.text,
              borderRight: `1px solid ${C.border}`,
              fontSize: 14,
            }}
          >
            {prefix}
          </div>
        )}

        {/* INPUT */}

        <input
          type={type}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          readOnly={!onChange}
          disabled={locked}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={locked ? "Locked" : placeholder || ""}
          autoComplete="off"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "9px 13px",
            fontSize: 14,
            color: locked ? C.textLight : C.text,
            background: "transparent",
            border: "none",
            outline: "none",
            cursor: locked ? "not-allowed" : "text",
          }}
        />
      </div>

      {/* ERROR */}

      {error && (
        <div
          style={{
            fontSize: 11,
            color: C.error,
            marginTop: 3,
            fontWeight: 500,
          }}
        >
          ⚠ {error}
        </div>
      )}
    </div>
  );
}
function ReviewItem({ label, value }) {
  return (
    <div
      style={{
        background: "white",
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "12px 14px",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: C.textLight,
          marginBottom: 4,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: C.text,
          wordBreak: "break-word",
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}

function TimeField({ label, value, onChange, required, disabled, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 14, flex: 1 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 700,
          color: disabled ? C.textLight : C.textMid,
          marginBottom: 5,
          letterSpacing: 0.5,
          textTransform: "uppercase",
        }}
      >
        {label}
        {required && <span style={{ color: C.error, marginLeft: 3 }}>*</span>}
      </label>
      <input
        type="time"
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "9px 13px",
          borderRadius: 8,
          fontSize: 14,
          cursor: disabled ? "not-allowed" : "pointer",
          color: disabled ? C.textLight : C.text,
          background: disabled ? C.locked : C.card,
          border: `1.5px solid ${error ? C.error : focused ? C.borderFocus : C.border}`,
          outline: "none",
          transition: "all 0.15s",
          boxShadow:
            focused && !disabled ? `0 0 0 3px ${C.primaryLight}` : "none",
        }}
      />
      {error && (
        <div
          style={{
            fontSize: 11,
            color: C.error,
            marginTop: 3,
            fontWeight: 500,
          }}
        >
          ⚠ {error}
        </div>
      )}
    </div>
  );
}

function RadioGroup({
  label,
  options,
  value,
  onChange,
  required,
  disabled,
  error,
  col,
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: disabled ? C.textLight : C.textMid,
          marginBottom: 8,
          letterSpacing: 0.5,
          textTransform: "uppercase",
        }}
      >
        {label}
        {required && <span style={{ color: C.error, marginLeft: 3 }}>*</span>}
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          flexDirection: col ? "column" : "row",
        }}
      >
        {options.map((opt) => {
          const sel = value === opt;
          return (
            <label
              key={opt}
              onClick={() => !disabled && onChange(opt)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: disabled ? "not-allowed" : "pointer",
                padding: "6px 12px",
                borderRadius: 8,
                border: `1.5px solid ${sel ? C.primary : C.border}`,
                background: sel ? C.primaryLight : C.card,
                transition: "all 0.15s",
                opacity: disabled ? 0.45 : 1,
                userSelect: "none",
              }}
            >
              <div
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  flexShrink: 0,
                  border: `2px solid ${sel ? C.primary : C.border}`,
                  background: sel ? C.primary : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s",
                }}
              >
                {sel && (
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#fff",
                    }}
                  />
                )}
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: sel ? 600 : 400,
                  color: sel ? C.primary : C.text,
                }}
              >
                {opt}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <div
          style={{
            fontSize: 11,
            color: C.error,
            marginTop: 3,
            fontWeight: 500,
          }}
        >
          ⚠ {error}
        </div>
      )}
    </div>
  );
}

function SelectField({
  label,
  options,
  value,
  onChange,
  required,
  error,
  disabled,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 700,
          color: disabled ? C.textLight : C.textMid,
          marginBottom: 5,
          letterSpacing: 0.5,
          textTransform: "uppercase",
        }}
      >
        {label}
        {required && <span style={{ color: C.error, marginLeft: 3 }}>*</span>}
      </label>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "9px 13px",
          borderRadius: 8,
          fontSize: 14,
          color: value ? C.text : C.textLight,
          background: disabled ? C.locked : C.card,
          border: `1.5px solid ${error ? C.error : focused ? C.borderFocus : C.border}`,
          outline: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.7 : 1,
          outline: "none",
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 4.5L11 1' stroke='%2394A3B8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 13px center",
          boxShadow: focused ? `0 0 0 3px ${C.primaryLight}` : "none",
          transition: "all 0.15s",
        }}
      >
        <option value="">Select an option</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && (
        <div
          style={{
            fontSize: 11,
            color: C.error,
            marginTop: 3,
            fontWeight: 500,
          }}
        >
          ⚠ {error}
        </div>
      )}
    </div>
  );
}

function SectionHead({ icon, title, subtitle }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 18,
        paddingBottom: 14,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: C.primaryLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 17,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: C.text,
            letterSpacing: -0.1,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 11, color: C.textLight, marginTop: 1 }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: C.card,
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        padding: "20px 22px",
        marginBottom: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Row({ children, gap = 12 }) {
  return (
    <div
      style={{
        display: "flex",
        gap,
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
}

function Stepper({ current, steps, completedSteps, onStepClick }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        WebkitOverflowScrolling: "touch",
        overflowX: "auto",
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 12,
        paddingRight: 12,
      }}
    >
      {steps.map((step, i) => {
        const done = completedSteps.includes(step.id);

        const active = step.id === current;

        return (
          <div
            key={step.id}
            style={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <div
              // onClick={() => {
              //   // ALLOW CURRENT
              //   if (step.id === current) return;

              //   // ALLOW PREVIOUS COMPLETED
              //   if (step.id < current) {
              //     onStepClick(step.id);
              //     return;
              //   }

              //   // ALLOW ONLY NEXT COMPLETED STEP
              //   if (completedSteps.includes(step.id - 1)) {
              //     onStepClick(step.id);
              //   }
              // }}

              onClick={() => onStepClick(step.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
                minWidth: 72,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: done ? C.primary : active ? C.card : C.bg,

                  border: `2.5px solid ${
                    done || active ? C.primary : C.border
                  }`,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  fontSize: 13,
                  fontWeight: 700,

                  color: done ? "#fff" : active ? C.primary : C.textLight,

                  boxShadow: active ? "0 0 0 4px rgba(21,128,61,0.65)" : "none",

                  transition: "all 0.3s",
                }}
              >
                {done ? "✓" : step.id}
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: active ? 700 : 500,
                  textAlign: "center",
                  color: done ? C.primary : active ? C.text : C.textLight,
                  letterSpacing: 0.2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 70,
                }}
              >
                {step.short}
              </div>
            </div>

            {i < steps.length - 1 && (
              <div
                style={{
                  width: 24,
                  height: 2,
                  background: done ? C.primary : C.border,

                  margin: "0 2px",
                  marginBottom: 16,
                  borderRadius: 2,

                  transition: "background 0.3s",

                  flexShrink: 0,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

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
export default function VisaForm() {
  const [step, setStep] = useState(1);

  const [completed, setCompleted] = useState([]);

  const [data, setData] = useState(initialFormData);

  const [errors, setErrors] = useState({});

  const { countryName } = useParams();

  const flagCode = countryFlags[countryName] || "AU";

  const country = countryName
    ?.replaceAll("-", " ")
    ?.replace(/\b\w/g, (c) => c.toUpperCase());

  const set = (field, val) =>
    setData((p) => ({
      ...p,
      [field]: val,
    }));

  const handleUpload = useCallback((field, file) => {
    setData((prev) => ({
      ...prev,
      [field]: file,
    }));
  }, []);

  const passportUploaded = !!data.passportFront && !!data.passportBack;
  const disableTravelDocs =
    data.payAfterVisaPackage === "Yes" ||
    data.taxPayAfterVisaPackage === "Yes" ||
    data.tripPayAfterVisaPackage === "Yes";

  const parseDate = (dateStr) => {
    if (!dateStr) return null;

    // INPUT TYPE DATE FORMAT

    if (dateStr.includes("-")) {
      return new Date(dateStr);
    }

    // DD/MM/YYYY FORMAT

    if (dateStr.includes("/")) {
      const [day, month, year] = dateStr.split("/");

      return new Date(year, month - 1, day);
    }

    return null;
  };

  const validateStep = (s) => {
    const e = {};

    // =========================
    // STEP 1 — DATES
    // =========================

    if (s === 1) {
      if (!data.visaStartDate) e.visaStartDate = "Required";

      if (!data.visaEndDate) e.visaEndDate = "Required";
    }

    // =========================
    // STEP 2 — PASSPORT
    // =========================

    if (s === 2) {
      // PASSPORT FRONT

      if (!data.passportFront) {
        e.passportFront = "Passport front is required";
      }
      if (!data.passportBack) {
        e.passportBack = "Passport back is required";
      }

      // FIRST NAME

      if (!data.firstName?.trim()) {
        e.firstName = "First name is required";
      }

      // LAST NAME

      if (!data.lastName?.trim()) {
        e.lastName = "Last name is required";
      }

      // PASSPORT NUMBER

      if (!data.passportNumber?.trim()) {
        e.passportNumber = "Passport number required";
      } else if (!/^[A-Z][0-9]{7}$/.test(data.passportNumber)) {
        e.passportNumber = "Invalid passport number";
      }

      // SEX

      if (!data.sex) {
        e.sex = "Please select sex";
      }

      // DOB

      if (!data.dateOfBirth) {
        e.dateOfBirth = "Date of birth required";
      }

      // DATE OF ISSUE

      if (!data.passportDateOfIssue) {
        e.passportDateOfIssue = "Date of issue required";
      }

      // DATE OF EXPIRY

      if (!data.passportDateOfExpiry) {
        e.passportDateOfExpiry = "Date of expiry required";
      }

      // EXPIRY VALIDATION
      else if (
        parseDate(data.passportDateOfExpiry) <
        parseDate(data.passportDateOfIssue)
      ) {
        e.passportDateOfExpiry = "Expiry must be after issue date";
      }

      // DOB VALIDATION
      else if (parseDate(data.dateOfBirth) >= new Date()) {
        e.dateOfBirth = "Invalid date of birth";
      }
    }

    // =========================
    // STEP 3 — FUNDS
    // =========================

    if (s === 3) {
      if (!data.showFunds) {
        e.showFunds = "Required";
      }

      if (data.showFunds === "Yes") {
        if (!data.bankBalanceCertificate) {
          e.bankBalanceCertificate = "Required";
        }

        if (!data.fdCertificate) {
          e.fdCertificate = "Required";
        }

        if (!data.fundsBankStatement) {
          e.fundsBankStatement = "Required";
        }
      }

      if (data.showFunds === "No") {
        if (!data.payAfterVisaPackage) {
          e.payAfterVisaPackage = "Required";
        }

        if (data.payAfterVisaPackage === "No") {
          e.payAfterVisaPackage = "You must select Yes to continue";
        }
      }
    }

    // =========================
    // STEP 4 — RETIRED
    // =========================

    if (s === 4) {
      if (!data.isRetired) {
        e.isRetired = "Please select an option";
      }

      if (data.isRetired === "Yes") {
        if (!data.retirementProof) {
          e.retirementProof = "Required";
        }

        if (!data.pensionStatement) {
          e.pensionStatement = "Required";
        }
      }
    }

    // =========================
    // STEP 5 — STUDENT
    // =========================

    if (s === 5) {
      if (!data.isStudent) {
        e.isStudent = "Please select an option";
      }

      if (data.isStudent === "Yes") {
        if (!data.bonafideCertificate) {
          e.bonafideCertificate = "Required";
        }

        if (!data.studentIdCard) {
          e.studentIdCard = "Required";
        }

        if (!data.studentNoc) {
          e.studentNoc = "Required";
        }

        if (!data.parentFinancialDocs) {
          e.parentFinancialDocs = "Required";
        }
      }
    }

    // =========================
    // STEP 6 — EMPLOYMENT
    // =========================

    if (s === 6) {
      if (!data.isEmployee) {
        e.isEmployee = "Please select an option";
      }

      if (data.isEmployee === "Yes") {
        // EMPLOYMENT TYPE

        if (!data.employeeType) {
          e.employeeType = "Required";
        }

        // PRIVATE / GOVERNMENT

        if (
          data.employeeType === "Private" ||
          data.employeeType === "Government"
        ) {
          if (!data.employmentProof) {
            e.employmentProof = "Required";
          }

          if (!data.salarySlips) {
            e.salarySlips = "Required";
          }

          if (!data.leaveApprovalLetter) {
            e.leaveApprovalLetter = "Required";
          }

          if (!data.companyIdCard) {
            e.companyIdCard = "Required";
          }
        }

        // SELF EMPLOYED

        if (data.employeeType === "Self Employed") {
          if (!data.businessRegistration) {
            e.businessRegistration = "Required";
          }

          if (!data.gstRegistration) {
            e.gstRegistration = "Required";
          }

          if (!data.businessBankStatement) {
            e.businessBankStatement = "Required";
          }

          if (!data.incomeProof) {
            e.incomeProof = "Required";
          }
        }
      }
    }
    // =========================
    // STEP 7 — TAX
    // =========================

    if (s === 7) {
      if (!data.fileIncomeTax) {
        e.fileIncomeTax = "Required";
      }

      if (data.fileIncomeTax === "Yes") {
        if (!data.itrCurrentYear) {
          e.itrCurrentYear = "Required";
        }

        if (!data.itrPreviousYear) {
          e.itrPreviousYear = "Required";
        }
      }

      if (data.fileIncomeTax === "No") {
        if (data.taxPayAfterVisaPackage !== "Yes") {
          e.taxPayAfterVisaPackage = "You must select Yes to continue";
        }
      }
    }

    // =========================
    // STEP 8 — MARRIED
    // =========================

    if (s === 8) {
      if (!data.isMarried) {
        e.isMarried = "Please select an option";
      }

      if (data.isMarried === "Yes") {
        if (!data.marriageCertificate) {
          e.marriageCertificate = "Required";
        }

        if (!data.spousePassport) {
          e.spousePassport = "Required";
        }

        if (!data.jointBankStatement) {
          e.jointBankStatement = "Required";
        }
      }
    }
    // =========================
    // STEP 9 — PERSONAL
    // =========================

    if (s === 9) {
      // PHONE

      if (!data.phone?.trim()) {
        e.phone = "Phone number required";
      } else if (!/^[0-9]{10}$/.test(data.phone)) {
        e.phone = "Phone number must be 10 digits";
      }

      // EMAIL

      if (!data.email?.trim()) {
        e.email = "Email required";
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(data.email)
      ) {
        e.email = "Invalid email address";
      }

      // OTHER NATIONALITY

      if (!data.otherNationality) {
        e.otherNationality = "Please select an option";
      }

      // VALIDATE NATIONALITIES

      if (data.otherNationality === "Yes") {
        const invalid = data.otherNationalities?.some((n) => !n.trim());

        if (invalid) {
          e.otherNationality = "Enter all nationalities";
        }
      }

      // CURRENT ADDRESS

      if (!data.currentAddressSameAsPassport) {
        e.currentAddressSameAsPassport = "Please select an option";
      }

      // MAILING ADDRESS

      if (!data.mailingAddressSameAsCurrent) {
        e.mailingAddressSameAsCurrent = "Please select an option";
      }

      // DURATION

      if (!data.durationAtCurrentResidence) {
        e.durationAtCurrentResidence = "Please select duration";
      }

      // OTHER NAME

      if (!data.everKnownByAnotherName) {
        e.everKnownByAnotherName = "Please select an option";
      }

      // VALIDATE OTHER NAMES

      if (data.everKnownByAnotherName === "Yes") {
        const invalid = data.otherNames?.some((n) => !n.trim());

        if (invalid) {
          e.everKnownByAnotherName = "Enter all names";
        }
      }

      // FAMILY MEMBERS TRAVELLING

      if (!data.familyTravelling) {
        e.familyTravelling = "Please select an option";
      }

      // VALIDATE FAMILY MEMBERS

      if (data.familyTravelling === "Yes") {
        const invalid = data.familyMembers.some(
          (m) => !m.name.trim() || !m.relationship.trim() || !m.dob,
        );

        if (invalid) {
          e.familyTravelling = "Enter all family members";
        }
      }

      // FRIENDS / RELATIVES IN {country}

      if (!data.friendsRelativesInCountry) {
        e.friendsRelativesInCountry = "Please select an option";
      }

      // VALIDATE CONTACTS

      if (data.friendsRelativesInCountry === "Yes") {
        const invalid = data.countryContacts.some(
          (c) =>
            !c.name.trim() ||
            !c.passportNumber.trim() ||
            !/^[A-Z0-9]{6,15}$/i.test(c.passportNumber) ||
            !c.dob,
        );

        if (invalid) {
          e.friendsRelativesInCountry = "Enter valid passport numbers";
        }

        const passports = data.countryContacts.map((c) =>
          c.passportNumber.trim(),
        );

        const uniquePassports = new Set(passports);

        if (passports.length !== uniquePassports.size) {
          e.friendsRelativesInCountry =
            "Duplicate passport numbers are not allowed";
        }
      }

      // PURPOSE OF VISIT

      if (!data.purposeOfVisit) {
        e.purposeOfVisit = "Please select purpose";
      }
    }

    // =========================
    // STEP 10 — TRIP SPONSOR
    // =========================

    if (s === 10) {
      if (!data.tripSponsor) {
        e.tripSponsor = "Please select an option";
      }

      // FAMILY / EMPLOYER

      if (data.tripSponsor === "Family" || data.tripSponsor === "Employer") {
        if (!data.sponsorLetter) {
          e.sponsorLetter = "Required";
        }

        if (!data.sponsorBankStatement) {
          e.sponsorBankStatement = "Required";
        }

        if (!data.sponsorItr) {
          e.sponsorItr = "Required";
        }

        if (!data.sponsorIdProof) {
          e.sponsorIdProof = "Required";
        }
      }

      // OVERSEAS RELATIVE

      if (data.tripSponsor === "Overseas Relative") {
        if (!data.overseasSponsorLetter) {
          e.overseasSponsorLetter = "Required";
        }

        if (!data.overseasSponsorBankStatement) {
          e.overseasSponsorBankStatement = "Required";
        }

        if (!data.overseasTaxReturn) {
          e.overseasTaxReturn = "Required";
        }

        if (!data.overseasRelativePassport) {
          e.overseasRelativePassport = "Required";
        }
      }
      // PAY AFTER VISA PACKAGE

      if (data.tripSponsor === "Pay After Visa Package") {
        if (!data.tripPayAfterVisaPackage) {
          e.tripPayAfterVisaPackage = "Required";
        }

        if (data.tripPayAfterVisaPackage === "No") {
          e.tripPayAfterVisaPackage = "You must select Yes to continue";
        }
      }
    }

    // =========================
    // STEP 11 — TRAVEL
    // =========================

    if (s === 11) {
      // TRAVEL HISTORY

      if (!data.travelHistoryLast5Years) {
        e.travelHistoryLast5Years = "Please select an option";
      }

      if (data.travelHistoryLast5Years === "Yes") {
        const invalid = data.travelHistory.some(
          (t) =>
            t.country.trim().length < 2 ||
            !t.fromDate ||
            !t.toDate ||
            parseDate(t.toDate) < parseDate(t.fromDate),
        );

        if (invalid) {
          e.travelHistoryLast5Years =
            "Complete all travel history entries with valid dates";
        }
      }

      // VISA DENIED

      if (!data.visaDenied) {
        e.visaDenied = "Please select an option";
      }

      // DENIED COUNTRIES

      if (data.visaDenied === "Yes") {
        const invalid = data.deniedCountries.some((c) => !c.trim());

        if (invalid) {
          e.visaDenied = "Enter all denied countries";
        }
      }
    }

    // =========================
    // STEP 12 — DOCUMENTS
    // =========================

    if (s === 12) {
      // ======================
      // PAY AFTER VISA CHECK
      // ======================

      const disableTravelDocs =
        data.payAfterVisaPackage === "Yes" ||
        data.taxPayAfterVisaPackage === "Yes" ||
        data.tripPayAfterVisaPackage === "Yes";

      // ======================
      // ONLY REQUIRED
      // IF NOT DISABLED
      // ======================

      if (!disableTravelDocs) {
        // TRAVEL ITINERARY

        if (!data.travelItinerary) {
          e.travelItinerary = "Required";
        }

        // COVER LETTER

        if (!data.coverLetter) {
          e.coverLetter = "Required";
        }
      }

      // ======================
      // ALWAYS REQUIRED
      // ======================

      // PAN CARD

      if (!data.panCard) {
        e.panCard = "Required";
      }

      // AADHAAR CARD

      if (!data.aadhaarCard) {
        e.aadhaarCard = "Required";
      }
    }

    // =========================
    // STEP 13 — REVIEW
    // =========================

    if (s === 13) {
      if (!data.confirmEnteredData) {
        e.confirmEnteredData = "Required";
      }

      if (!data.acceptTerms) {
        e.acceptTerms = "Please accept terms & conditions";
      }
    }

    return e;
  };

  const goNext = () => {
    const e = validateStep(step);

    if (Object.keys(e).length > 0) {
      setErrors(e);

      return;
    }

    setErrors({});

    setCompleted((p) => (p.includes(step) ? p : [...p, step]));

    setStep((s) => Math.min(s + 1, STEPS.length));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isCurrentStepValid = () => {
    // STEP 1

    if (step === 1) {
      return (
        !!data.visaStartDate &&
        !!data.visaEndDate &&
        parseDate(data.visaEndDate) >= parseDate(data.visaStartDate)
      );
    }

    // STEP 2

    if (step === 2) {
      return (
        !!data.passportFront &&
        !!data.passportBack &&
        !!data.firstName?.trim() &&
        !!data.lastName?.trim() &&
        /^[A-Z][0-9]{7}$/.test(data.passportNumber) &&
        !!data.sex &&
        !!data.dateOfBirth &&
        !!data.passportDateOfIssue &&
        !!data.passportDateOfExpiry
      );
    }
    // step 3

    if (step === 3) {
      if (!data.showFunds) return false;

      if (data.showFunds === "Yes") {
        return (
          !!data.bankBalanceCertificate &&
          !!data.fdCertificate &&
          !!data.fundsBankStatement
        );
      }

      if (data.showFunds === "No") {
        return data.payAfterVisaPackage === "Yes";
      }
    }

    // step 4
    if (step === 4) {
      if (!data.isRetired) return false;

      if (data.isRetired === "No") {
        return true;
      }

      return !!data.retirementProof && !!data.pensionStatement;
    }
    // step 5

    if (step === 5) {
      if (!data.isStudent) return false;

      if (data.isStudent === "No") {
        return true;
      }

      return (
        !!data.bonafideCertificate &&
        !!data.studentIdCard &&
        !!data.studentNoc &&
        !!data.parentFinancialDocs
      );
    }
    // STEP 6

    if (step === 6) {
      if (!data.isEmployee) return false;

      if (data.isEmployee === "No") {
        return true;
      }

      // PRIVATE / GOVERNMENT

      if (
        data.employeeType === "Private" ||
        data.employeeType === "Government"
      ) {
        return (
          !!data.employeeType &&
          !!data.employmentProof &&
          !!data.salarySlips &&
          !!data.leaveApprovalLetter &&
          !!data.companyIdCard
        );
      }

      // SELF EMPLOYED

      if (data.employeeType === "Self Employed") {
        return (
          !!data.employeeType &&
          !!data.businessRegistration &&
          !!data.gstRegistration &&
          !!data.businessBankStatement &&
          !!data.incomeProof
        );
      }

      return false;
    }

    // STEP 7

    if (step === 7) {
      if (!data.fileIncomeTax) {
        return false;
      }

      // YES

      if (data.fileIncomeTax === "Yes") {
        return !!data.itrCurrentYear && !!data.itrPreviousYear;
      }

      // NO

      if (data.fileIncomeTax === "No") {
        return data.taxPayAfterVisaPackage === "Yes";
      }

      return false;
    }

    // step 8

    if (step === 8) {
      if (!data.isMarried) return false;

      if (data.isMarried === "No") {
        return true;
      }

      return (
        !!data.marriageCertificate &&
        !!data.spousePassport &&
        !!data.jointBankStatement
      );
    }
    // STEP 9

    if (step === 9) {
      return (
        // PHONE

        /^[0-9]{10}$/.test(data.phone) &&
        // EMAIL

        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(data.email) &&
        // OTHER NATIONALITY

        !!data.otherNationality &&
        (data.otherNationality === "No" ||
          data.otherNationalities?.every((n) => n.trim())) &&
        // CURRENT ADDRESS

        !!data.currentAddressSameAsPassport &&
        // MAILING ADDRESS

        !!data.mailingAddressSameAsCurrent &&
        // DURATION

        !!data.durationAtCurrentResidence &&
        // OTHER NAME

        !!data.everKnownByAnotherName &&
        (data.everKnownByAnotherName === "No" ||
          data.otherNames?.every((n) => n.trim())) &&
        // FAMILY TRAVELLING

        !!data.familyTravelling &&
        (data.familyTravelling === "No" ||
          data.familyMembers?.every(
            (m) => m.name.trim() && m.relationship.trim() && m.dob,
          )) &&
        // FRIENDS / RELATIVES

        !!data.friendsRelativesInCountry &&
        (data.friendsRelativesInCountry === "No" ||
          data.countryContacts?.every(
            (c) =>
              c.name.trim() &&
              /^[A-Z0-9]{6,15}$/i.test(c.passportNumber) &&
              c.dob,
          )) &&
        // PURPOSE

        !!data.purposeOfVisit
      );
    }

    // STEP 10

    if (step === 10) {
      return (
        !!data.tripSponsor &&
        (data.tripSponsor === "Self" ||
          ((data.tripSponsor === "Family" || data.tripSponsor === "Employer") &&
            !!data.sponsorLetter &&
            !!data.sponsorBankStatement &&
            !!data.sponsorItr &&
            !!data.sponsorIdProof) ||
          (data.tripSponsor === "Overseas Relative" &&
            !!data.overseasSponsorLetter &&
            !!data.overseasSponsorBankStatement &&
            !!data.overseasTaxReturn &&
            !!data.overseasRelativePassport) ||
          (data.tripSponsor === "Pay After Visa Package" &&
            data.tripPayAfterVisaPackage === "Yes"))
      );
    }

    // STEP 11

    if (step === 11) {
      return (
        // TRAVEL HISTORY

        !!data.travelHistoryLast5Years &&
        (data.travelHistoryLast5Years === "No" ||
          data.travelHistory.every(
            (t) =>
              t.country.trim().length >= 2 &&
              t.fromDate &&
              t.toDate &&
              parseDate(t.toDate) >= parseDate(t.fromDate),
          )) &&
        // VISA DENIED

        !!data.visaDenied &&
        (data.visaDenied === "No" ||
          data.deniedCountries.every((c) => c.trim()))
      );
    }

    // STEP 12

    if (step === 12) {
      // ======================
      // PAY AFTER VISA CHECK
      // ======================

      const disableTravelDocs =
        data.payAfterVisaPackage === "Yes" ||
        data.taxPayAfterVisaPackage === "Yes" ||
        data.tripPayAfterVisaPackage === "Yes";

      return (
        // ======================
        // TRAVEL DOCS
        // ONLY REQUIRED
        // WHEN ENABLED
        // ======================

        (disableTravelDocs || (!!data.travelItinerary && !!data.coverLetter)) &&
        // ======================
        // ALWAYS REQUIRED
        // ======================

        !!data.panCard &&
        !!data.aadhaarCard
      );
    }
    // STEP 13

    if (step === 13) {
      return data.confirmEnteredData && data.acceptTerms;
    }

    return true;
  };
  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progressPct = Math.round(((step - 1) / (STEPS.length - 1)) * 100);

  const reviewGrid = {
    display: "grid",

    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",

    gap: 14,

    marginTop: 14,
  };

  const dividerStyle = {
    height: 1,
    background: C.border,
    margin: "28px 0",
  };
  const checkboxLabel = {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
    cursor: "pointer",
    lineHeight: 1.7,
    color: C.text,
    fontSize: 15,
  };

  const checkboxStyle = {
    width: 22,
    height: 22,
    marginTop: 3,
    accentColor: C.primary,
    cursor: "pointer",
  };

  const tableHead = {
    textAlign: "left",

    padding: "12px 14px",

    fontSize: 13,

    fontWeight: 700,

    color: C.text,

    background: "#F8FAFC",

    borderBottom: `1px solid ${C.border}`,
  };

  const tableCell = {
    padding: "12px 14px",

    fontSize: 13,

    color: C.text,

    borderBottom: `1px solid ${C.border}`,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#EEF2FF",
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Top Nav ── */}
      <div
        style={{
          background: C.text,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          minHeight: 58,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Left Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            minWidth: 0,
            flex: 1,
          }}
        >
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

          <div
            style={{
              minWidth: 0,
              flex: 1,
            }}
          >
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "clamp(13px, 2vw, 15px)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {country} Visitor Visa Application
            </div>

            <div
              style={{
                color: "#64748B",
                fontSize: "clamp(10px, 1.5vw, 11px)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Subclass 600 — Tourist Stream · Department of Home Affairs
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
            maxWidth: 220,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 6,
              background: "#1E293B",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPct}%`,
                background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`,
                transition: "width .5s ease",
                borderRadius: 999,
              }}
            />
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#94A3B8",
              fontWeight: 700,
              minWidth: 40,
              textAlign: "right",
            }}
          >
            {progressPct}%
          </div>
        </div>
      </div>

      {/* ── Stepper ── */}
      <div
        style={{
          background: C.card,
          borderBottom: `1px solid ${C.border}`,
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{ maxWidth: 900, margin: "0 auto", padding: "14px 20px 10px" }}
        >
          <Stepper
            current={step}
            steps={STEPS}
            completedSteps={completed}
            onStepClick={(clickedStep) => {
              setStep(clickedStep);
            }}
          />
        </div>
      </div>

      {/* ── Main ── */}
      <div
        style={{ maxWidth: 900, margin: "24px auto 60px", padding: "0 18px" }}
      >
        {/* Step heading */}
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 4,
                  height: 28,
                  background: C.primary,
                  borderRadius: 2,
                }}
              />
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: C.text,
                  letterSpacing: -0.4,
                }}
              >
                {STEPS[step - 1].label}
              </div>
            </div>
            <div
              style={{
                fontSize: 13,
                color: C.textMid,
                marginTop: 5,
                marginLeft: 14,
              }}
            >
              {step === 1 &&
                `Select your intended travel dates for ${country} `}

              {step === 2 &&
                "Upload passport front and back pages and enter passport details"}

              {step === 3 &&
                "Provide proof of funds or choose Pay After Visa Package"}

              {step === 4 &&
                "Provide retirement and pension supporting documents if applicable"}

              {step === 5 &&
                "Provide student-related supporting documents if applicable"}

              {step === 6 &&
                "Provide employment or self-employed business supporting documents"}

              {step === 7 &&
                "Provide your income tax return documents or choose Pay After Visa Package"}

              {step === 8 &&
                "Provide marriage-related supporting documents if applicable"}

              {step === 9 &&
                "Enter your personal, residential, and contact information"}

              {step === 10 &&
                "Select who is sponsoring or paying for the trip and upload supporting financial documents if required"}

              {step === 11 && "Provide travel history"}

              {step === 12 &&
                "Upload mandatory supporting documents for your visa application"}

              {step === 13 &&
                "Review your application and confirm declarations before payment"}
            </div>
          </div>
          <div
            style={{
              background: C.primaryLight,
              color: C.primary,
              fontSize: 12,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 20,
              flexShrink: 0,
            }}
          >
            {completed.length} / {STEPS.length} Steps Completed
          </div>
        </div>

        {/* ── STEP 1 ── */}

        {step === 1 && (
          <Card>
            <SectionHead
              icon="🗓️"
              title="Planned Travel Dates"
              subtitle="Select your intended arrival and departure dates"
            />
            <Row>
              <Field
                label="Start Date"
                type="date"
                value={data.visaStartDate || ""}
                onChange={(v) => {
                  set("visaStartDate", v);

                  // RESET INVALID END DATE

                  if (
                    data.visaEndDate &&
                    parseDate(data.visaEndDate) < parseDate(v)
                  ) {
                    set("visaEndDate", "");
                  }
                }}
                required
                placeholder="DD/MM/YYYY"
                error={errors.visaStartDate}
              />
              <Field
                label="End Date"
                type="date"
                value={data.visaEndDate || ""}
                onChange={(v) => {
                  // VALIDATION

                  if (
                    data.visaStartDate &&
                    parseDate(v) < parseDate(data.visaStartDate)
                  ) {
                    alert("End date must be after start date");

                    return;
                  }

                  set("visaEndDate", v);
                }}
                required
                placeholder="DD/MM/YYYY"
                error={errors.visaEndDate}
              />
            </Row>
            {data.visaStartDate && data.visaEndDate && (
              <div
                style={{
                  background: C.primaryLight,
                  borderRadius: 8,
                  padding: "9px 13px",
                  fontSize: 12,
                  color: C.primary,
                  fontWeight: 600,
                  marginTop: 2,
                  lineHeight: 1.6,
                }}
              >
                📅 Travel Duration:{" "}
                {Math.ceil(
                  (parseDate(data.visaEndDate) -
                    parseDate(data.visaStartDate)) /
                    (1000 * 60 * 60 * 24),
                )}{" "}
                Days
              </div>
            )}
          </Card>
        )}
        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
              alignItems: "stretch",
            }}
          >
            <div>
              <Card
                style={{
                  height: "100%",
                }}
              >
                <SectionHead
                  icon="📷"
                  title="Passport Images"
                  subtitle="Clear, unobstructed scans or photos"
                />
                {!passportUploaded && (
                  <div
                    style={{
                      background: "#FFF7ED",
                      border: "1px solid #FED7AA",
                      borderRadius: 8,
                      padding: "10px 13px",
                      marginBottom: 14,
                      fontSize: 12,
                      color: "#92400E",
                      lineHeight: 1.5,
                    }}
                  >
                    💡 Upload passport front and back for verification. Please
                    fill all details manually.
                  </div>
                )}
                <UploadBox
                  label="Passport Front"
                  number="1"
                  field="passportFront"
                  value={data.passportFront}
                  onUpload={handleUpload}
                  hint="Data page with photo"
                />
                {errors.passportFront && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.passportFront}
                  </div>
                )}
                <UploadBox
                  label="Passport Back"
                  number="2"
                  field="passportBack"
                  value={data.passportBack}
                  onUpload={handleUpload}
                />
                {errors.passportBack && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.passportBack}
                  </div>
                )}
              </Card>
            </div>

            <div>
              <Card
                style={{
                  height: "100%",
                }}
              >
                <SectionHead
                  icon="🪪"
                  title="Passport Holder Details"
                  subtitle={
                    passportUploaded
                      ? "Passport uploaded successfully"
                      : "Fill all details manually"
                  }
                />

                {passportUploaded && (
                  <div
                    style={{
                      background: C.successLight,
                      border: `1px solid #A7F3D0`,
                      borderRadius: 8,
                      padding: "9px 13px",
                      marginBottom: 14,
                      fontSize: 12,
                      color: C.success,
                      fontWeight: 600,
                    }}
                  >
                    ✅ Passport images uploaded successfully. Please ensure all
                    details match your passport exactly.
                  </div>
                )}
                <Row>
                  <Field
                    label="Given / Middle Name"
                    value={data.firstName || ""}
                    onChange={(v) => set("firstName", v)}
                    required
                    disabled={!passportUploaded}
                    error={errors.firstName}
                  />
                  <Field
                    label="Last Name / Surname"
                    value={data.lastName || ""}
                    onChange={(v) => set("lastName", v)}
                    required
                    disabled={!passportUploaded}
                    error={errors.lastName}
                  />
                </Row>
                <Field
                  label="Passport Number"
                  value={data.passportNumber || ""}
                  onChange={(v) => set("passportNumber", v.toUpperCase())}
                  required
                  disabled={!passportUploaded}
                  error={errors.passportNumber}
                />
                <RadioGroup
                  label="Sex"
                  options={["Male", "Female", "Others"]}
                  value={data.sex || ""}
                  onChange={(v) => set("sex", v)}
                  required
                  disabled={!passportUploaded}
                  error={errors.sex}
                />
                <Row>
                  <Field
                    label="Date of Birth"
                    value={data.dateOfBirth || ""}
                    type="date"
                    onChange={(v) => set("dateOfBirth", v)}
                    required
                    disabled={!passportUploaded}
                    placeholder="DD/MM/YYYY"
                    error={errors.dateOfBirth}
                  />
                  <Field
                    label="Place of Birth"
                    type="text"
                    value={data.placeOfBirth || ""}
                    onChange={(v) => set("placeOfBirth", v)}
                    disabled={!passportUploaded}
                  />
                </Row>
                <Row>
                  <Field
                    label="Date of Issue"
                    type="date"
                    value={data.passportDateOfIssue || ""}
                    onChange={(v) => {
                      set("passportDateOfIssue", v);

                      // RESET INVALID EXPIRY DATE

                      if (
                        data.passportDateOfExpiry &&
                        parseDate(data.passportDateOfExpiry) < parseDate(v)
                      ) {
                        set("passportDateOfExpiry", "");
                      }
                    }}
                    required
                    disabled={!passportUploaded}
                    placeholder="DD/MM/YYYY"
                    error={errors.passportDateOfIssue}
                  />
                  <Field
                    label="Date of Expiry"
                    type="date"
                    value={data.passportDateOfExpiry || ""}
                    onChange={(v) => {
                      // VALIDATION

                      if (
                        data.passportDateOfIssue &&
                        parseDate(v) < parseDate(data.passportDateOfIssue)
                      ) {
                        alert("Expiry date must be after issue date");

                        return;
                      }

                      set("passportDateOfExpiry", v);
                    }}
                    required
                    disabled={!passportUploaded}
                    placeholder="DD/MM/YYYY"
                    error={errors.passportDateOfExpiry}
                  />
                </Row>
              </Card>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}

        {step === 3 && (
          <Card>
            <SectionHead
              icon="💰"
              title="Funds Verification"
              subtitle="Provide your financial proof documents"
            />

            <RadioGroup
              label="Will you show your funds?"
              options={["Yes", "No"]}
              value={data.showFunds || ""}
              onChange={(v) => {
                set("showFunds", v);

                // USER SELECTED NO

                if (v === "No") {
                  setData((prev) => ({
                    ...prev,
                    bankBalanceCertificate: null,
                    fdCertificate: null,
                    fundsBankStatement: null,
                  }));
                }

                // USER SELECTED YES AGAIN

                if (v === "Yes") {
                  setData((prev) => ({
                    ...prev,
                    payAfterVisaPackage: "",
                  }));
                }
              }}
              required
            />

            {data.showFunds === "Yes" && (
              <>
                <UploadBox
                  label="Bank Balance Certificate"
                  number="1"
                  field="bankBalanceCertificate"
                  value={data.bankBalanceCertificate}
                  onUpload={handleUpload}
                />
                {errors.bankBalanceCertificate && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.bankBalanceCertificate}
                  </div>
                )}

                <UploadBox
                  label="FD Certificate"
                  number="2"
                  field="fdCertificate"
                  value={data.fdCertificate}
                  onUpload={handleUpload}
                />
                {errors.fdCertificate && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.fdCertificate}
                  </div>
                )}

                <UploadBox
                  label="Bank Statement (6 Months)"
                  number="3"
                  field="fundsBankStatement"
                  value={data.fundsBankStatement}
                  onUpload={handleUpload}
                />
                {errors.fundsBankStatement && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.fundsBankStatement}
                  </div>
                )}
              </>
            )}

            {data.showFunds === "No" && (
              <>
                <RadioGroup
                  label="Are you sure you want to choose Pay After Visa Package?"
                  options={["Yes", "No"]}
                  value={data.payAfterVisaPackage || ""}
                  onChange={(v) => set("payAfterVisaPackage", v)}
                  required
                  error={errors.payAfterVisaPackage}
                />

                {data.payAfterVisaPackage === "Yes" && (
                  <div
                    style={{
                      marginTop: 14,
                      padding: 14,
                      borderRadius: 12,
                      background: "#FEF3C7",
                      border: "1px solid #F59E0B",
                      color: "#92400E",
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    ⚠ You selected Pay After Visa Package. Additional charges
                    may apply later.
                  </div>
                )}
              </>
            )}
          </Card>
        )}
        {/* ── STEP 4 ── */}

        {step === 4 && (
          <Card>
            <SectionHead
              icon="👴"
              title="Retirement Documents"
              subtitle="Upload pension and retirement-related financial documents"
            />

            <RadioGroup
              label="Are you retired?"
              options={["Yes", "No"]}
              value={data.isRetired || ""}
              onChange={(v) => {
                set("isRetired", v);

                if (v === "No") {
                  setData((prev) => ({
                    ...prev,
                    retirementProof: null,
                    pensionStatement: null,
                  }));
                }
              }}
              required
              error={errors.isRetired}
            />

            {data.isRetired === "Yes" && (
              <>
                <UploadBox
                  label="Retirement Proof"
                  number="1"
                  field="retirementProof"
                  value={data.retirementProof}
                  onUpload={handleUpload}
                />
                {errors.retirementProof && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.retirementProof}
                  </div>
                )}

                <UploadBox
                  label="Pension Statement"
                  number="2"
                  field="pensionStatement"
                  value={data.pensionStatement}
                  onUpload={handleUpload}
                />

                {errors.pensionStatement && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.pensionStatement}
                  </div>
                )}
              </>
            )}
          </Card>
        )}

        {/* ── STEP 5 ── */}

        {step === 5 && (
          <Card>
            <SectionHead
              icon="🎓"
              title="Student Documents"
              subtitle="Upload academic and supporting financial documents if applicable"
            />

            <RadioGroup
              label="Are you a student?"
              options={["Yes", "No"]}
              value={data.isStudent || ""}
              onChange={(v) => {
                set("isStudent", v);

                if (v === "No") {
                  setData((prev) => ({
                    ...prev,
                    bonafideCertificate: null,
                    studentIdCard: null,
                    studentNoc: null,
                    parentFinancialDocs: null,
                  }));
                }
              }}
              required
              error={errors.isStudent}
            />

            {data.isStudent === "Yes" && (
              <>
                <UploadBox
                  label="Bonafide Certificate"
                  number="1"
                  field="bonafideCertificate"
                  value={data.bonafideCertificate}
                  onUpload={handleUpload}
                />
                {errors.bonafideCertificate && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.bonafideCertificate}
                  </div>
                )}

                <UploadBox
                  label="Student ID Card"
                  number="2"
                  field="studentIdCard"
                  value={data.studentIdCard}
                  onUpload={handleUpload}
                />
                {errors.studentIdCard && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.studentIdCard}
                  </div>
                )}

                <UploadBox
                  label="NOC From Institution"
                  number="3"
                  field="studentNoc"
                  value={data.studentNoc}
                  onUpload={handleUpload}
                />
                {errors.studentNoc && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.studentNoc}
                  </div>
                )}

                <UploadBox
                  label="Parent Financial Documents"
                  number="4"
                  field="parentFinancialDocs"
                  value={data.parentFinancialDocs}
                  onUpload={handleUpload}
                />
                {errors.parentFinancialDocs && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.parentFinancialDocs}
                  </div>
                )}
              </>
            )}
          </Card>
        )}

        {/* ── STEP 6 ── */}

        {step === 6 && (
          <Card>
            <SectionHead
              icon="💼"
              title="Employment Documents"
              subtitle="Upload employment or business-related supporting documents"
            />

            <RadioGroup
              label="Are you employed?"
              options={["Yes", "No"]}
              value={data.isEmployee || ""}
              onChange={(v) => {
                set("isEmployee", v);

                // RESET EVERYTHING WHEN NO

                if (v === "No") {
                  setData((prev) => ({
                    ...prev,

                    employeeType: "",

                    // EMPLOYEE DOCS

                    employmentProof: null,
                    salarySlips: null,
                    leaveApprovalLetter: null,
                    companyIdCard: null,

                    // BUSINESS DOCS

                    businessRegistration: null,
                    gstRegistration: null,
                    businessBankStatement: null,
                    incomeProof: null,
                  }));
                }
              }}
              required
              error={errors.isEmployee}
            />

            {data.isEmployee === "Yes" && (
              <>
                <RadioGroup
                  label="Employment Type"
                  options={["Private", "Government", "Self Employed"]}
                  value={data.employeeType || ""}
                  onChange={(v) => {
                    set("employeeType", v);

                    // RESET EMPLOYEE DOCS

                    if (v === "Self Employed") {
                      setData((prev) => ({
                        ...prev,

                        employmentProof: null,
                        salarySlips: null,
                        leaveApprovalLetter: null,
                        companyIdCard: null,
                      }));
                    }

                    // RESET BUSINESS DOCS

                    if (v === "Private" || v === "Government") {
                      setData((prev) => ({
                        ...prev,

                        businessRegistration: null,
                        gstRegistration: null,
                        businessBankStatement: null,
                        incomeProof: null,
                      }));
                    }
                  }}
                  required
                  error={errors.employeeType}
                />

                {/* PRIVATE / GOVERNMENT */}

                {(data.employeeType === "Private" ||
                  data.employeeType === "Government") && (
                  <>
                    <UploadBox
                      label="Employment Proof"
                      number="1"
                      field="employmentProof"
                      value={data.employmentProof}
                      onUpload={handleUpload}
                    />

                    {errors.employmentProof && (
                      <div
                        style={{
                          fontSize: 11,
                          color: C.error,
                          marginTop: -8,
                          marginBottom: 10,
                        }}
                      >
                        ⚠ {errors.employmentProof}
                      </div>
                    )}

                    <UploadBox
                      label="Salary Slips (3 Months)"
                      number="2"
                      field="salarySlips"
                      value={data.salarySlips}
                      onUpload={handleUpload}
                    />

                    {errors.salarySlips && (
                      <div
                        style={{
                          fontSize: 11,
                          color: C.error,
                          marginTop: -8,
                          marginBottom: 10,
                        }}
                      >
                        ⚠ {errors.salarySlips}
                      </div>
                    )}

                    <UploadBox
                      label="Leave Approval Letter"
                      number="3"
                      field="leaveApprovalLetter"
                      value={data.leaveApprovalLetter}
                      onUpload={handleUpload}
                    />

                    {errors.leaveApprovalLetter && (
                      <div
                        style={{
                          fontSize: 11,
                          color: C.error,
                          marginTop: -8,
                          marginBottom: 10,
                        }}
                      >
                        ⚠ {errors.leaveApprovalLetter}
                      </div>
                    )}

                    <UploadBox
                      label="Company ID Card"
                      number="4"
                      field="companyIdCard"
                      value={data.companyIdCard}
                      onUpload={handleUpload}
                    />

                    {errors.companyIdCard && (
                      <div
                        style={{
                          fontSize: 11,
                          color: C.error,
                          marginTop: -8,
                          marginBottom: 10,
                        }}
                      >
                        ⚠ {errors.companyIdCard}
                      </div>
                    )}
                  </>
                )}

                {/* SELF EMPLOYED */}

                {data.employeeType === "Self Employed" && (
                  <>
                    <UploadBox
                      label="Business Registration"
                      number="1"
                      field="businessRegistration"
                      value={data.businessRegistration}
                      onUpload={handleUpload}
                    />

                    {errors.businessRegistration && (
                      <div
                        style={{
                          fontSize: 11,
                          color: C.error,
                          marginTop: -8,
                          marginBottom: 10,
                        }}
                      >
                        ⚠ {errors.businessRegistration}
                      </div>
                    )}

                    <UploadBox
                      label="GST Registration"
                      number="2"
                      field="gstRegistration"
                      value={data.gstRegistration}
                      onUpload={handleUpload}
                    />

                    {errors.gstRegistration && (
                      <div
                        style={{
                          fontSize: 11,
                          color: C.error,
                          marginTop: -8,
                          marginBottom: 10,
                        }}
                      >
                        ⚠ {errors.gstRegistration}
                      </div>
                    )}

                    <UploadBox
                      label="Business Bank Statement"
                      number="3"
                      field="businessBankStatement"
                      value={data.businessBankStatement}
                      onUpload={handleUpload}
                    />

                    {errors.businessBankStatement && (
                      <div
                        style={{
                          fontSize: 11,
                          color: C.error,
                          marginTop: -8,
                          marginBottom: 10,
                        }}
                      >
                        ⚠ {errors.businessBankStatement}
                      </div>
                    )}

                    <UploadBox
                      label="Income Proof"
                      number="4"
                      field="incomeProof"
                      value={data.incomeProof}
                      onUpload={handleUpload}
                    />

                    {errors.incomeProof && (
                      <div
                        style={{
                          fontSize: 11,
                          color: C.error,
                          marginTop: -8,
                          marginBottom: 10,
                        }}
                      >
                        ⚠ {errors.incomeProof}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </Card>
        )}

        {/* ── STEP 7 ── */}

        {step === 7 && (
          <Card>
            <SectionHead
              icon="🧾"
              title="Tax Records"
              subtitle="Upload income tax return documents or choose Pay After Visa Package"
            />

            <RadioGroup
              label="Do you file income tax records?"
              options={["Yes", "No"]}
              value={data.fileIncomeTax || ""}
              onChange={(v) => {
                set("fileIncomeTax", v);

                // RESET ITR DOCS

                if (v === "No") {
                  setData((prev) => ({
                    ...prev,

                    itrCurrentYear: null,
                    itrPreviousYear: null,
                  }));
                }

                // REMOVE PACKAGE WARNING

                if (v === "Yes") {
                  setData((prev) => ({
                    ...prev,

                    taxPayAfterVisaPackage: "",
                  }));
                }
              }}
              required
              error={errors.fileIncomeTax}
            />

            {/* YES */}

            {data.fileIncomeTax === "Yes" && (
              <>
                <UploadBox
                  label="ITR Current Year"
                  number="1"
                  field="itrCurrentYear"
                  value={data.itrCurrentYear}
                  onUpload={handleUpload}
                />

                {errors.itrCurrentYear && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.itrCurrentYear}
                  </div>
                )}

                <UploadBox
                  label="ITR Previous Year"
                  number="2"
                  field="itrPreviousYear"
                  value={data.itrPreviousYear}
                  onUpload={handleUpload}
                />

                {errors.itrPreviousYear && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.itrPreviousYear}
                  </div>
                )}
              </>
            )}

            {/* NO */}

            {data.fileIncomeTax === "No" && (
              <>
                <RadioGroup
                  label="Are you sure you want to choose Pay After Visa Package?"
                  options={["Yes", "No"]}
                  value={data.taxPayAfterVisaPackage || ""}
                  onChange={(v) => set("taxPayAfterVisaPackage", v)}
                  required
                  error={errors.taxPayAfterVisaPackage}
                />

                {data.taxPayAfterVisaPackage === "Yes" && (
                  <div
                    style={{
                      marginTop: 14,
                      padding: 14,
                      borderRadius: 12,
                      background: "#FEF3C7",
                      border: "1px solid #F59E0B",
                      color: "#92400E",
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    ⚠ You selected Pay After Visa Package for Tax Records.
                    Additional charges may apply later.
                  </div>
                )}
              </>
            )}
          </Card>
        )}

        {/* ── STEP 8 ── */}

        {step === 8 && (
          <Card>
            <SectionHead
              icon="💍"
              title="Marriage Documents"
              subtitle="Upload spouse and marriage-related supporting documents"
            />

            <RadioGroup
              label="Are you married?"
              options={["Yes", "No"]}
              value={data.isMarried || ""}
              onChange={(v) => {
                set("isMarried", v);

                if (v === "No") {
                  setData((prev) => ({
                    ...prev,
                    marriageCertificate: null,
                    spousePassport: null,
                    jointBankStatement: null,
                  }));
                }
              }}
              required
              error={errors.isMarried}
            />

            {data.isMarried === "Yes" && (
              <>
                <UploadBox
                  label="Marriage Certificate"
                  number="1"
                  field="marriageCertificate"
                  value={data.marriageCertificate}
                  onUpload={handleUpload}
                />
                {errors.marriageCertificate && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.marriageCertificate}
                  </div>
                )}

                <UploadBox
                  label="Spouse Passport Copy"
                  number="2"
                  field="spousePassport"
                  value={data.spousePassport}
                  onUpload={handleUpload}
                />
                {errors.spousePassport && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.spousePassport}
                  </div>
                )}

                <UploadBox
                  label="Joint Bank Statement"
                  number="3"
                  field="jointBankStatement"
                  value={data.jointBankStatement}
                  onUpload={handleUpload}
                />

                {errors.jointBankStatement && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.jointBankStatement}
                  </div>
                )}
              </>
            )}
          </Card>
        )}
        {/* ── STEP 9 ── */}
        {step === 9 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
              alignItems: "stretch",
            }}
          >
            <div>
              <Card
                style={{
                  height: "100%",
                }}
              >
                <SectionHead
                  icon="📞"
                  title="Personal Details"
                  subtitle={"Enter your personal information"}
                />

                <Field
                  label="Phone Number"
                  type="tel"
                  value={data.phone || ""}
                  onChange={(v) => {
                    const cleaned = v.replace(/\D/g, "");

                    if (cleaned.length <= 10) {
                      set("phone", cleaned);
                    }
                  }}
                  required
                  error={errors.phone}
                  placeholder="9876543210"
                  prefix="+91"
                />
                <Field
                  label="Email Address"
                  type="email"
                  value={data.email || ""}
                  onChange={(v) => set("email", v.toLowerCase())}
                  required
                  error={errors.email}
                  placeholder="example@gmail.com"
                />
                <RadioGroup
                  label="Is your current address same as per passport?"
                  options={["Yes", "No"]}
                  value={data.currentAddressSameAsPassport || ""}
                  onChange={(v) => set("currentAddressSameAsPassport", v)}
                  required
                  error={errors.currentAddressSameAsPassport}
                />
                <RadioGroup
                  label="Mailing address same as current address?"
                  options={["Yes", "No"]}
                  value={data.mailingAddressSameAsCurrent || ""}
                  onChange={(v) => set("mailingAddressSameAsCurrent", v)}
                  required
                  error={errors.mailingAddressSameAsCurrent}
                />
                <RadioGroup
                  label="Duration of stay at current residence"
                  options={["Less than 6 months", "More than 6 months"]}
                  value={data.durationAtCurrentResidence || ""}
                  onChange={(v) => set("durationAtCurrentResidence", v)}
                  required
                  col
                  error={errors.durationAtCurrentResidence}
                />
                <RadioGroup
                  label="Purpose of Visit"
                  options={["Tourism", "Business", "Visiting Friends & Family"]}
                  value={data.purposeOfVisit || ""}
                  onChange={(v) => set("purposeOfVisit", v)}
                  required
                  col
                  error={errors.purposeOfVisit}
                />
                <RadioGroup
                  label="Have you ever held another nationality?"
                  options={["Yes", "No"]}
                  value={data.otherNationality || ""}
                  onChange={(v) => {
                    set("otherNationality", v);

                    if (v === "No") {
                      set("otherNationalities", [""]);
                    }
                  }}
                  required
                  error={errors.otherNationality}
                />

                {data.otherNationality === "Yes" && (
                  <div style={{ marginBottom: 16 }}>
                    {data.otherNationalities.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: 8,
                          marginBottom: 8,
                        }}
                      >
                        <Field
                          label={`Nationality ${index + 1}`}
                          value={item}
                          onChange={(v) => {
                            const updated = [...data.otherNationalities];

                            updated[index] = v;

                            set("otherNationalities", updated);
                          }}
                          placeholder="Enter nationality"
                        />

                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = data.otherNationalities.filter(
                                (_, i) => i !== index,
                              );

                              set("otherNationalities", updated);
                            }}
                            style={{
                              marginTop: 28,
                              height: 38,
                              width: 38,
                              borderRadius: 8,
                              border: "none",
                              background: "#FEE2E2",
                              color: "#DC2626",
                              cursor: "pointer",
                              fontWeight: 700,
                            }}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        set("otherNationalities", [
                          ...data.otherNationalities,
                          "",
                        ])
                      }
                      style={{
                        border: "none",
                        background: C.primaryLight,
                        color: C.primary,
                        padding: "8px 14px",
                        borderRadius: 8,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      + Add Nationality
                    </button>
                  </div>
                )}
                <RadioGroup
                  label="Family members travelling with you?"
                  options={["Yes", "No"]}
                  value={data.familyTravelling || ""}
                  onChange={(v) => {
                    set("familyTravelling", v);

                    if (v === "No") {
                      set("familyMembers", [
                        {
                          name: "",
                          relationship: "",
                          dob: "",
                        },
                      ]);
                    }
                  }}
                  required
                  error={errors.familyTravelling}
                />

                {data.familyTravelling === "Yes" && (
                  <div style={{ marginBottom: 16 }}>
                    {data.familyMembers.map((member, index) => (
                      <div
                        key={index}
                        style={{
                          background: "#fff",
                          border: "1px solid #E5E7EB",
                          borderRadius: 16,
                          padding: 16,
                          marginBottom: 16,
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 16,
                          }}
                        >
                          <h4
                            style={{
                              margin: 0,
                              fontSize: 18,
                              fontWeight: 700,
                              color: "#1F2937",
                            }}
                          >
                            Traveler #{index + 1}
                          </h4>

                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = data.familyMembers.filter(
                                  (_, i) => i !== index,
                                );
                                set("familyMembers", updated);
                              }}
                              style={{
                                border: "none",
                                background: "#FEE2E2",
                                color: "#DC2626",
                                padding: "8px 12px",
                                borderRadius: 8,
                                cursor: "pointer",
                                fontWeight: 600,
                              }}
                            >
                              ✕ Remove
                            </button>
                          )}
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: 16,
                            width: "100%",
                          }}
                        >
                          <Field
                            label="👤 Full Name"
                            value={member.name || ""}
                            onChange={(v) => {
                              const updated = [...data.familyMembers];
                              updated[index].name = v;
                              set("familyMembers", updated);
                            }}
                            placeholder="Enter full name"
                          />

                          <SelectField
                            label="🤝 Relationship"
                            options={[
                              "Father",
                              "Mother",
                              "Brother",
                              "Sister",
                              "Spouse",
                              "Child",
                              "Friend",
                              "Relative",
                              "Other",
                            ]}
                            value={member.relationship || ""}
                            onChange={(v) => {
                              const updated = [...data.familyMembers];
                              updated[index].relationship = v;
                              set("familyMembers", updated);
                            }}
                          />

                          <Field
                            label="🎂 Date of Birth"
                            type="date"
                            value={member.dob || ""}
                            onChange={(v) => {
                              const updated = [...data.familyMembers];
                              updated[index].dob = v;
                              set("familyMembers", updated);
                            }}
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        if (data.familyMembers.length >= 10) return;

                        set("familyMembers", [
                          ...data.familyMembers,
                          {
                            name: "",
                            relationship: "",
                            dob: "",
                          },
                        ]);
                      }}
                      style={{
                        border: "none",
                        background: C.primary,
                        color: "#fff",
                        padding: "12px 18px",
                        borderRadius: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      + Add Family Member
                    </button>
                  </div>
                )}
                <RadioGroup
                  label="Ever officially known by another name?"
                  options={["Yes", "No"]}
                  value={data.everKnownByAnotherName || ""}
                  onChange={(v) => {
                    set("everKnownByAnotherName", v);

                    if (v === "No") {
                      set("otherNames", [""]);
                    }
                  }}
                  required
                  error={errors.everKnownByAnotherName}
                />

                {data.everKnownByAnotherName === "Yes" && (
                  <div style={{ marginBottom: 16 }}>
                    {data.otherNames.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: 8,
                          marginBottom: 8,
                        }}
                      >
                        <Field
                          label={`Other Name ${index + 1}`}
                          value={item}
                          onChange={(v) => {
                            const updated = [...data.otherNames];

                            updated[index] = v;

                            set("otherNames", updated);
                          }}
                          placeholder="Enter full name"
                        />

                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = data.otherNames.filter(
                                (_, i) => i !== index,
                              );

                              set("otherNames", updated);
                            }}
                            style={{
                              marginTop: 28,
                              height: 38,
                              width: 38,
                              borderRadius: 8,
                              border: "none",
                              background: "#FEE2E2",
                              color: "#DC2626",
                              cursor: "pointer",
                              fontWeight: 700,
                            }}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        set("otherNames", [...data.otherNames, ""])
                      }
                      style={{
                        border: "none",
                        background: C.primaryLight,
                        color: C.primary,
                        padding: "8px 14px",
                        borderRadius: 8,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      + Add Name
                    </button>
                  </div>
                )}
                <RadioGroup
                  label={`Friends or relatives in ${country}`}
                  options={["Yes", "No"]}
                  value={data.friendsRelativesInCountry || ""}
                  onChange={(v) => {
                    set("friendsRelativesInCountry", v);

                    if (v === "No") {
                      set("countryContacts", [
                        {
                          name: "",
                          passportNumber: "",
                          dob: "",
                        },
                      ]);
                    }
                  }}
                  required
                  error={errors.friendsRelativesInCountry}
                />

                {data.friendsRelativesInCountry === "Yes" && (
                  <div style={{ marginBottom: 16 }}>
                    {data.countryContacts.map((contact, index) => (
                      <div
                        key={index}
                        style={{
                          background: "#fff",
                          border: "1px solid #E5E7EB",
                          borderRadius: 16,
                          padding: 16,
                          marginBottom: 16,
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 16,
                            flexWrap: "wrap",
                            gap: 10,
                          }}
                        >
                          <h4
                            style={{
                              margin: 0,
                              fontSize: 18,
                              fontWeight: 700,
                              color: "#1F2937",
                            }}
                          >
                            Contact #{index + 1}
                          </h4>

                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = data.countryContacts.filter(
                                  (_, i) => i !== index,
                                );

                                set("countryContacts", updated);
                              }}
                              style={{
                                border: "none",
                                background: "#FEE2E2",
                                color: "#DC2626",
                                padding: "8px 12px",
                                borderRadius: 8,
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              ✕ Remove
                            </button>
                          )}
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: 16,
                            width: "100%",
                          }}
                        >
                          <Field
                            label="👤 Full Name"
                            value={contact.name || ""}
                            onChange={(v) => {
                              const updated = [...data.countryContacts];
                              updated[index].name = v;
                              set("countryContacts", updated);
                            }}
                            placeholder="Enter full name"
                          />

                          <Field
                            label="🛂 Passport Number"
                            value={contact.passportNumber || ""}
                            onChange={(v) => {
                              const updated = [...data.countryContacts];
                              updated[index].passportNumber = v;
                              set("countryContacts", updated);
                            }}
                            placeholder="Enter passport number"
                          />

                          <Field
                            label="🎂 Date of Birth"
                            type="date"
                            value={contact.dob || ""}
                            onChange={(v) => {
                              const updated = [...data.countryContacts];
                              updated[index].dob = v;
                              set("countryContacts", updated);
                            }}
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        if (data.countryContacts.length >= 10) return;

                        set("countryContacts", [
                          ...data.countryContacts,
                          {
                            name: "",
                            passportNumber: "",
                            dob: "",
                          },
                        ]);
                      }}
                      style={{
                        border: "none",
                        background: C.primary,
                        color: "#fff",
                        padding: "12px 18px",
                        borderRadius: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      + Add Contact
                    </button>
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}

        {/* ── STEP 10 ── */}

        {step === 10 && (
          <Card>
            <SectionHead
              icon="💳"
              title="Trip Sponsorship"
              subtitle="Select who is paying for the trip and upload sponsor documents if required"
            />

            <RadioGroup
              label="Who is paying for the trip?"
              options={[
                "Self",
                "Family",
                "Employer",
                "Overseas Relative",
                "Pay After Visa Package",
              ]}
              value={data.tripSponsor || ""}
              onChange={(v) => {
                // CLEAR OLD DOCS FIRST

                setData((prev) => ({
                  ...prev,

                  sponsorLetter: null,

                  sponsorBankStatement: null,

                  sponsorItr: null,

                  sponsorIdProof: null,

                  overseasSponsorLetter: null,

                  overseasSponsorBankStatement: null,

                  overseasTaxReturn: null,

                  overseasRelativePassport: null,

                  tripPayAfterVisaPackage: "",
                }));

                // SET NEW VALUE

                set("tripSponsor", v);
              }}
              required
              error={errors.tripSponsor}
            />

            {/* FAMILY / EMPLOYER */}

            {(data.tripSponsor === "Family" ||
              data.tripSponsor === "Employer") && (
              <>
                <UploadBox
                  label="Sponsorship Letter"
                  number="1"
                  field="sponsorLetter"
                  value={data.sponsorLetter}
                  onUpload={handleUpload}
                />

                {errors.sponsorLetter && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.sponsorLetter}
                  </div>
                )}

                <UploadBox
                  label="6 Months Sponsor Bank Statement"
                  number="2"
                  field="sponsorBankStatement"
                  value={data.sponsorBankStatement}
                  onUpload={handleUpload}
                />

                {errors.sponsorBankStatement && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.sponsorBankStatement}
                  </div>
                )}

                <UploadBox
                  label="2 Years ITR"
                  number="3"
                  field="sponsorItr"
                  value={data.sponsorItr}
                  onUpload={handleUpload}
                />

                {errors.sponsorItr && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.sponsorItr}
                  </div>
                )}

                <UploadBox
                  label="Sponsor ID Proof"
                  number="4"
                  field="sponsorIdProof"
                  value={data.sponsorIdProof}
                  onUpload={handleUpload}
                />

                {errors.sponsorIdProof && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.sponsorIdProof}
                  </div>
                )}
              </>
            )}

            {/* OVERSEAS RELATIVE */}

            {data.tripSponsor === "Overseas Relative" && (
              <>
                <UploadBox
                  label="Sponsorship Letter"
                  number="1"
                  field="overseasSponsorLetter"
                  value={data.overseasSponsorLetter}
                  onUpload={handleUpload}
                />

                {errors.overseasSponsorLetter && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.overseasSponsorLetter}
                  </div>
                )}

                <UploadBox
                  label="6 Months Sponsor Bank Statement"
                  number="2"
                  field="overseasSponsorBankStatement"
                  value={data.overseasSponsorBankStatement}
                  onUpload={handleUpload}
                />

                {errors.overseasSponsorBankStatement && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.overseasSponsorBankStatement}
                  </div>
                )}

                <UploadBox
                  label="Tax Return Statement"
                  number="3"
                  field="overseasTaxReturn"
                  value={data.overseasTaxReturn}
                  onUpload={handleUpload}
                />

                {errors.overseasTaxReturn && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.overseasTaxReturn}
                  </div>
                )}

                <UploadBox
                  label="Passport Of Overseas Relative"
                  number="4"
                  field="overseasRelativePassport"
                  value={data.overseasRelativePassport}
                  onUpload={handleUpload}
                />

                {errors.overseasRelativePassport && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.error,
                      marginTop: -8,
                      marginBottom: 10,
                    }}
                  >
                    ⚠ {errors.overseasRelativePassport}
                  </div>
                )}
              </>
            )}

            {/* PAY AFTER VISA */}

            {data.tripSponsor === "Pay After Visa Package" && (
              <RadioGroup
                label="Select Pay After Visa Package"
                options={["Yes", "No"]}
                value={data.tripPayAfterVisaPackage || ""}
                onChange={(v) => set("tripPayAfterVisaPackage", v)}
                required
                error={errors.tripPayAfterVisaPackage}
              />
            )}
            {data.tripPayAfterVisaPackage === "Yes" && (
              <div
                style={{
                  marginTop: 14,
                  padding: 14,
                  borderRadius: 12,
                  background: "#FEF3C7",
                  border: "1px solid #F59E0B",
                  color: "#92400E",
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                ⚠ You selected Pay After Visa Package. Additional charges may
                apply later.
              </div>
            )}
          </Card>
        )}
        {/* ── STEP 11 ── */}

        {step === 11 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
              alignItems: "stretch",
            }}
          >
            <Card>
              <SectionHead
                icon="✈️"
                title="Travel History"
                subtitle="Provide your intended travel and visa history details"
              />

              <RadioGroup
                label="Have you travelled to any other country in the last 5 years?"
                options={["Yes", "No"]}
                value={data.travelHistoryLast5Years || ""}
                onChange={(v) => {
                  set("travelHistoryLast5Years", v);

                  // RESET DATA

                  if (v === "No") {
                    set("travelHistory", [
                      {
                        country: "",
                        fromDate: "",
                        toDate: "",
                        visaFile: null,
                      },
                    ]);

                    setErrors((prev) => ({
                      ...prev,
                      travelHistoryLast5Years: "",
                    }));
                  }
                }}
                required
                error={errors.travelHistoryLast5Years}
              />

              {/* YES */}

              {data.travelHistoryLast5Years === "Yes" && (
                <div style={{ marginTop: 14 }}>
                  {data.travelHistory.map((trip, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: 20,
                        padding: 16,
                        borderRadius: 14,
                        background: "#F8FAFC",
                        border: `1px solid ${C.border}`,
                      }}
                    >
                      {/* HEADER */}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 14,
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            color: C.text,
                          }}
                        >
                          Travel History #{index + 1}
                        </div>

                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = data.travelHistory.filter(
                                (_, i) => i !== index,
                              );

                              set("travelHistory", updated);

                              setErrors((prev) => ({
                                ...prev,
                                travelHistoryLast5Years: "",
                              }));
                            }}
                            style={{
                              border: "none",
                              background: "#FEE2E2",
                              color: "#DC2626",
                              padding: "6px 12px",
                              borderRadius: 8,
                              cursor: "pointer",
                              fontWeight: 700,
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {/* COUNTRY */}

                      <Field
                        label="Country Name"
                        value={trip.country || ""}
                        onChange={(v) => {
                          const updated = [...data.travelHistory];

                          updated[index].country = v;

                          set("travelHistory", updated);

                          setErrors((prev) => ({
                            ...prev,
                            travelHistoryLast5Years: "",
                          }));
                        }}
                        placeholder="Enter country name"
                      />

                      {/* DATES */}

                      <Row>
                        <Field
                          label="From Date"
                          type="date"
                          value={trip.fromDate}
                          onChange={(v) => {
                            const updated = [...data.travelHistory];

                            updated[index].fromDate = v;

                            set("travelHistory", updated);

                            setErrors((prev) => ({
                              ...prev,
                              travelHistoryLast5Years: "",
                            }));
                          }}
                        />

                        <Field
                          label="To Date"
                          type="date"
                          value={trip.toDate}
                          onChange={(v) => {
                            const updated = [...data.travelHistory];

                            updated[index].toDate = v;

                            set("travelHistory", updated);

                            // DATE VALIDATION

                            if (
                              trip.fromDate &&
                              parseDate(v) < parseDate(trip.fromDate)
                            ) {
                              setErrors((prev) => ({
                                ...prev,
                                travelHistoryLast5Years:
                                  "Travel To Date must be after From Date",
                              }));
                            } else {
                              setErrors((prev) => ({
                                ...prev,
                                travelHistoryLast5Years: "",
                              }));
                            }
                          }}
                        />
                      </Row>

                      {/* OPTIONAL VISA */}

                      <UploadBox
                        label="Visa Copy (Optional)"
                        number={index + 1}
                        field={`travelVisaFile_${index}`}
                        value={trip.visaFile}
                        onUpload={(field, file) => {
                          const updated = [...data.travelHistory];
                          updated[index].visaFile = file;
                          set("travelHistory", updated);
                        }}
                        required={false}
                      />
                    </div>
                  ))}

                  {/* ADD COUNTRY */}

                  {data.travelHistory.length < 10 && (
                    <button
                      type="button"
                      onClick={() => {
                        set("travelHistory", [
                          ...data.travelHistory,
                          {
                            country: "",
                            fromDate: "",
                            toDate: "",
                            visaFile: null,
                          },
                        ]);
                      }}
                      style={{
                        border: "none",
                        background: C.primaryLight,
                        color: C.primary,
                        padding: "10px 16px",
                        borderRadius: 8,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      + Add Another Country
                    </button>
                  )}

                  {/* COUNTER */}

                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      color: C.textLight,
                    }}
                  >
                    🌍 Countries Added: {data.travelHistory.length}
                  </div>
                </div>
              )}

              {/* NO */}

              {data.travelHistoryLast5Years === "No" && (
                <div
                  style={{
                    marginTop: 12,
                    fontSize: 13,
                    color: C.textLight,
                    fontStyle: "italic",
                  }}
                >
                  No international travel history added.
                </div>
              )}

              {/* VISA DENIED */}

              <RadioGroup
                label="Have you ever been denied a visa for any country?"
                options={["Yes", "No"]}
                value={data.visaDenied || ""}
                onChange={(v) => {
                  set("visaDenied", v);

                  if (v === "No") {
                    set("deniedCountries", [""]);
                  }
                }}
                required
                error={errors.visaDenied}
              />

              {/* YES */}

              {data.visaDenied === "Yes" && (
                <div style={{ marginTop: 14 }}>
                  {data.deniedCountries.map((country, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Field
                        label={`Country ${index + 1}`}
                        value={country || ""}
                        onChange={(v) => {
                          const updated = [...data.deniedCountries];

                          updated[index] = v;

                          set("deniedCountries", updated);
                        }}
                        placeholder="Enter country name"
                      />

                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = data.deniedCountries.filter(
                              (_, i) => i !== index,
                            );

                            set("deniedCountries", updated);
                          }}
                          style={{
                            marginTop: 28,
                            height: 42,
                            width: 42,
                            borderRadius: 8,
                            border: "none",
                            background: "#FEE2E2",
                            color: "#DC2626",
                            cursor: "pointer",
                            fontWeight: 700,
                          }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}

                  {data.deniedCountries.length < 10 && (
                    <button
                      type="button"
                      onClick={() => {
                        set("deniedCountries", [...data.deniedCountries, ""]);
                      }}
                      style={{
                        border: "none",
                        background: C.primaryLight,
                        color: C.primary,
                        padding: "10px 16px",
                        borderRadius: 8,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      + Add Another Country
                    </button>
                  )}
                </div>
              )}

              {/* NO */}

              {data.visaDenied === "No" && (
                <div
                  style={{
                    marginTop: 12,
                    fontSize: 13,
                    color: C.textLight,
                    fontStyle: "italic",
                  }}
                >
                  No previous visa refusals declared.
                </div>
              )}
            </Card>
          </div>
        )}

        {/* ── STEP 12 ── */}

        {step === 12 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
              alignItems: "stretch",
            }}
          >
            {/* LEFT CARD */}

            <Card>
              <SectionHead icon="📄" title="Mandatory Documents" />

              {/* TRAVEL ITINERARY */}

              <UploadBox
                label="Travel Itinerary"
                number="1"
                field="travelItinerary"
                value={data.travelItinerary}
                onUpload={disableTravelDocs ? undefined : handleUpload}
                disabled={disableTravelDocs}
                hint={
                  disableTravelDocs
                    ? "⚠ Disabled because Pay After Visa Package is selected in Funds, Tax, or Sponsorship section."
                    : "Complete travel itinerary including flight details and travel plan."
                }
              />

              {disableTravelDocs && (
                <div
                  style={{
                    background: "#FEF3C7",

                    border: "1px solid #F59E0B",

                    color: "#92400E",

                    padding: "6px 8px",

                    borderRadius: 10,

                    fontSize: 8,

                    fontWeight: 700,

                    lineHeight: 1.6,

                    marginTop: -4,

                    marginBottom: 8,
                  }}
                >
                  ⚠ Upload disabled because Pay After Visa Package is selected
                  in another step.
                </div>
              )}

              {errors.travelItinerary && (
                <div
                  style={{
                    fontSize: 11,
                    color: C.error,
                    marginTop: -8,
                    marginBottom: 10,
                  }}
                >
                  ⚠ {errors.travelItinerary}
                </div>
              )}

              {/* COVER LETTER */}

              <UploadBox
                label="Cover Letter"
                number="5"
                field="coverLetter"
                value={data.coverLetter}
                onUpload={disableTravelDocs ? undefined : handleUpload}
                disabled={disableTravelDocs}
                hint={
                  disableTravelDocs
                    ? "⚠ Disabled because Pay After Visa Package is selected in Funds, Tax, or Sponsorship section."
                    : "Personal cover letter explaining purpose of travel."
                }
              />
              {disableTravelDocs && (
                <div
                  style={{
                    background: "#FEF3C7",

                    border: "1px solid #F59E0B",

                    color: "#92400E",

                    padding: "6px 8px",

                    borderRadius: 10,

                    fontSize: 8,

                    fontWeight: 700,

                    lineHeight: 1.6,

                    marginTop: -4,

                    marginBottom: 8,
                  }}
                >
                  ⚠ Upload disabled because Pay After Visa Package is selected
                  in another step.
                </div>
              )}

              {errors.coverLetter && (
                <div
                  style={{
                    fontSize: 11,
                    color: C.error,
                    marginTop: -8,
                    marginBottom: 10,
                  }}
                >
                  ⚠ {errors.coverLetter}
                </div>
              )}

              {/* VISA STAMPS — OPTIONAL */}

              <UploadBox
                label="Visa Stamps (Optional)"
                number="3"
                field="visaStamps"
                value={data.visaStamps}
                onUpload={handleUpload}
                required={false}
                hint="Copies of previous visa stamps and travel history pages."
              />
            </Card>

            {/* RIGHT CARD */}

            <Card>
              <SectionHead icon="📋" title="Additional Documents" />

              {/* AADHAAR */}

              <UploadBox
                label="Aadhaar Card"
                number="4"
                field="aadhaarCard"
                value={data.aadhaarCard}
                onUpload={handleUpload}
                hint="Government-issued Aadhaar card copy."
              />

              {errors.aadhaarCard && (
                <div
                  style={{
                    fontSize: 11,
                    color: C.error,
                    marginTop: -8,
                    marginBottom: 10,
                  }}
                >
                  ⚠ {errors.aadhaarCard}
                </div>
              )}

              {/* PAN CARD */}

              <UploadBox
                label="Pan Card"
                number="2"
                field="panCard"
                value={data.panCard}
                onUpload={handleUpload}
                hint="Pan Card required for identity verification."
              />

              {errors.panCard && (
                <div
                  style={{
                    fontSize: 11,
                    color: C.error,
                    marginTop: -8,
                    marginBottom: 10,
                  }}
                >
                  ⚠ {errors.panCard}
                </div>
              )}
            </Card>
          </div>
        )}
        {/* ── STEP 13 ── */}

        {step === 13 && (
          <Card>
            {/* HEADER */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 28,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: C.text,
                    letterSpacing: -0.5,
                  }}
                >
                  Review Application
                </div>

                <div
                  style={{
                    fontSize: 14,
                    color: C.textLight,
                    marginTop: 6,
                  }}
                >
                  Carefully verify all information before final submission.
                </div>
              </div>
            </div>

            {/* STEP 1 */}

            <div style={{ marginBottom: 34 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: C.text,
                      letterSpacing: -0.3,
                    }}
                  >
                    🛂 Step 1 — Visa Details
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: C.textLight,
                      marginTop: 4,
                    }}
                  >
                    Review your selected visa duration and travel timing.
                  </div>
                </div>

                <button
                  onClick={() => setStep(1)}
                  style={{
                    border: `1.5px solid ${C.primary}`,

                    background: "#fff",

                    color: C.primary,

                    padding: "9px 16px",

                    borderRadius: 10,

                    fontWeight: 700,

                    cursor: "pointer",

                    fontSize: 13,
                  }}
                >
                  Edit
                </button>
              </div>

              <div style={reviewGrid}>
                <ReviewItem
                  label="Visa Start Date"
                  value={data.visaStartDate}
                />

                <ReviewItem label="Visa End Date" value={data.visaEndDate} />
              </div>
            </div>

            {/* STEP 2 */}
            <div style={{ marginBottom: 34 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: C.text,
                      letterSpacing: -0.3,
                    }}
                  >
                    📘 Step 2 — Passport Details
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: C.textLight,
                      marginTop: 4,
                    }}
                  >
                    Review passport and identity information entered in the
                    application.
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  style={{
                    border: `1.5px solid ${C.primary}`,

                    background: "#fff",

                    color: C.primary,

                    padding: "9px 16px",

                    borderRadius: 10,

                    fontWeight: 700,

                    cursor: "pointer",

                    fontSize: 13,
                  }}
                >
                  Edit
                </button>
              </div>

              <div style={reviewGrid}>
                <ReviewItem label="First Name" value={data.firstName} />

                <ReviewItem label="Last Name" value={data.lastName} />

                <ReviewItem
                  label="Passport Number"
                  value={data.passportNumber}
                />

                <ReviewItem label="Sex" value={data.sex} />

                <ReviewItem label="Date Of Birth" value={data.dateOfBirth} />

                <ReviewItem label="Place Of Birth" value={data.placeOfBirth} />

                <ReviewItem
                  label="Passport Issue Date"
                  value={data.passportDateOfIssue}
                />

                <ReviewItem
                  label="Passport Expiry Date"
                  value={data.passportDateOfExpiry}
                />

                <ReviewItem
                  label="Passport Front"
                  value={data.passportFront ? "Uploaded ✅" : "Missing ❌"}
                />

                <ReviewItem
                  label="Passport Back"
                  value={data.passportBack ? "Uploaded ✅" : "Missing ❌"}
                />
              </div>
            </div>
            {/* STEP 3 */}

            <div style={{ marginBottom: 34 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: C.text,
                      letterSpacing: -0.3,
                    }}
                  >
                    💰 Step 3 — Funds
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: C.textLight,
                      marginTop: 4,
                    }}
                  >
                    Review financial proof, bank balance documents, and selected
                    funds package information.
                  </div>
                </div>

                <button
                  onClick={() => setStep(3)}
                  style={{
                    border: `1.5px solid ${C.primary}`,

                    background: "#fff",

                    color: C.primary,

                    padding: "9px 16px",

                    borderRadius: 10,

                    fontWeight: 700,

                    cursor: "pointer",

                    fontSize: 13,
                  }}
                >
                  Edit
                </button>
              </div>

              <div style={reviewGrid}>
                <ReviewItem label="Show Funds" value={data.showFunds} />

                {data.showFunds === "Yes" && (
                  <>
                    <ReviewItem
                      label="Bank Balance Certificate"
                      value={
                        data.bankBalanceCertificate
                          ? "Uploaded ✅"
                          : "Missing ❌"
                      }
                    />

                    <ReviewItem
                      label="FD Certificate"
                      value={data.fdCertificate ? "Uploaded ✅" : "Missing ❌"}
                    />

                    <ReviewItem
                      label="Funds Bank Statement"
                      value={
                        data.fundsBankStatement ? "Uploaded ✅" : "Missing ❌"
                      }
                    />
                  </>
                )}

                {data.showFunds === "No" && (
                  <ReviewItem
                    label="Pay After Visa"
                    value={
                      !data.payAfterVisaPackage
                        ? "-"
                        : data.payAfterVisaPackage === "Yes"
                          ? "Pay After Visa Selected ✅"
                          : "Missing ❌"
                    }
                  />
                )}
              </div>
            </div>
            {/* STEP 4 — RETIREMENT */}

            <div style={{ marginBottom: 34 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: C.text,
                      letterSpacing: -0.3,
                    }}
                  >
                    👴 Step 4 — Retirement Documents
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: C.textLight,
                      marginTop: 4,
                    }}
                  >
                    Review retirement, pension, and financial supporting
                    documents submitted for the visa application.
                  </div>
                </div>

                <button
                  onClick={() => setStep(4)}
                  style={{
                    border: `1.5px solid ${C.primary}`,

                    background: "#fff",

                    color: C.primary,

                    padding: "9px 16px",

                    borderRadius: 10,

                    fontWeight: 700,

                    cursor: "pointer",

                    fontSize: 13,
                  }}
                >
                  Edit
                </button>
              </div>

              <div style={reviewGrid}>
                {/* RETIRED STATUS */}

                <ReviewItem label="Retired" value={data.isRetired} />

                {/* DOCUMENTS */}

                {data.isRetired === "Yes" && (
                  <>
                    <ReviewItem
                      label="Retirement Proof"
                      value={
                        data.retirementProof ? "Uploaded ✅" : "Missing ❌"
                      }
                    />

                    <ReviewItem
                      label="Pension Statement"
                      value={
                        data.pensionStatement ? "Uploaded ✅" : "Missing ❌"
                      }
                    />
                  </>
                )}
              </div>
            </div>
            {/* STEP 5 — STUDENT */}

            <div style={{ marginBottom: 34 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: C.text,
                      letterSpacing: -0.3,
                    }}
                  >
                    🎓 Step 5 — Student Documents
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: C.textLight,
                      marginTop: 4,
                    }}
                  >
                    Review student verification, educational details, and
                    uploaded supporting documents.
                  </div>
                </div>

                <button
                  onClick={() => setStep(5)}
                  style={{
                    border: `1.5px solid ${C.primary}`,

                    background: "#fff",

                    color: C.primary,

                    padding: "9px 16px",

                    borderRadius: 10,

                    fontWeight: 700,

                    cursor: "pointer",

                    fontSize: 13,
                  }}
                >
                  Edit
                </button>
              </div>

              <div style={reviewGrid}>
                {/* STUDENT STATUS */}

                <ReviewItem label="Student" value={data.isStudent} />

                {/* DOCUMENTS */}

                {data.isStudent === "Yes" && (
                  <>
                    <ReviewItem
                      label="Bonafide Certificate"
                      value={
                        data.bonafideCertificate ? "Uploaded ✅" : "Missing ❌"
                      }
                    />

                    <ReviewItem
                      label="Student ID Card"
                      value={data.studentIdCard ? "Uploaded ✅" : "Missing ❌"}
                    />

                    <ReviewItem
                      label="Student NOC"
                      value={data.studentNoc ? "Uploaded ✅" : "Missing ❌"}
                    />

                    <ReviewItem
                      label="Parent Financial Docs"
                      value={
                        data.parentFinancialDocs ? "Uploaded ✅" : "Missing ❌"
                      }
                    />
                  </>
                )}
              </div>
            </div>
            {/* STEP 6 — EMPLOYMENT */}

            <div style={{ marginBottom: 34 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: C.text,
                      letterSpacing: -0.3,
                    }}
                  >
                    💼 Step 6 — Employment
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: C.textLight,
                      marginTop: 4,
                    }}
                  >
                    Review employment, salary, and business supporting
                    documents.
                  </div>
                </div>

                <button
                  onClick={() => setStep(6)}
                  style={{
                    border: `1.5px solid ${C.primary}`,

                    background: "#fff",

                    color: C.primary,

                    padding: "9px 16px",

                    borderRadius: 10,

                    fontWeight: 700,

                    cursor: "pointer",

                    fontSize: 13,
                  }}
                >
                  Edit
                </button>
              </div>

              <div style={reviewGrid}>
                {/* EMPLOYEE STATUS */}

                <ReviewItem label="Employee" value={data.isEmployee} />

                {/* EMPLOYMENT TYPE */}

                {data.isEmployee === "Yes" && (
                  <>
                    <ReviewItem
                      label="Employment Type"
                      value={data.employeeType || "-"}
                    />

                    {/* PRIVATE */}

                    {data.employeeType === "Private" && (
                      <>
                        <ReviewItem
                          label="Employment Proof"
                          value={
                            data.employmentProof ? "Uploaded ✅" : "Missing ❌"
                          }
                        />

                        <ReviewItem
                          label="Salary Slips"
                          value={
                            data.salarySlips ? "Uploaded ✅" : "Missing ❌"
                          }
                        />

                        <ReviewItem
                          label="Leave Approval Letter"
                          value={
                            data.leaveApprovalLetter
                              ? "Uploaded ✅"
                              : "Missing ❌"
                          }
                        />

                        <ReviewItem
                          label="Company ID Card"
                          value={
                            data.companyIdCard ? "Uploaded ✅" : "Missing ❌"
                          }
                        />
                      </>
                    )}

                    {/* GOVERNMENT */}

                    {data.employeeType === "Government" && (
                      <>
                        <ReviewItem
                          label="Employment Proof"
                          value={
                            data.employmentProof ? "Uploaded ✅" : "Missing ❌"
                          }
                        />

                        <ReviewItem
                          label="Salary Slips"
                          value={
                            data.salarySlips ? "Uploaded ✅" : "Missing ❌"
                          }
                        />

                        <ReviewItem
                          label="Leave Approval Letter"
                          value={
                            data.leaveApprovalLetter
                              ? "Uploaded ✅"
                              : "Missing ❌"
                          }
                        />

                        <ReviewItem
                          label="Government ID Card"
                          value={
                            data.companyIdCard ? "Uploaded ✅" : "Missing ❌"
                          }
                        />
                      </>
                    )}

                    {/* SELF EMPLOYED */}

                    {data.employeeType === "Self Employed" && (
                      <>
                        <ReviewItem
                          label="Business Registration"
                          value={
                            data.businessRegistration
                              ? "Uploaded ✅"
                              : "Missing ❌"
                          }
                        />

                        <ReviewItem
                          label="GST Registration"
                          value={
                            data.gstRegistration ? "Uploaded ✅" : "Missing ❌"
                          }
                        />

                        <ReviewItem
                          label="Business Bank Statement"
                          value={
                            data.businessBankStatement
                              ? "Uploaded ✅"
                              : "Missing ❌"
                          }
                        />

                        <ReviewItem
                          label="Income Proof"
                          value={
                            data.incomeProof ? "Uploaded ✅" : "Missing ❌"
                          }
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            {/* STEP 7 — TAX */}

            <div style={{ marginBottom: 34 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: C.text,
                      letterSpacing: -0.3,
                    }}
                  >
                    🧾 Step 7 — Tax Records
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: C.textLight,
                      marginTop: 4,
                    }}
                  >
                    Review income tax filing details and uploaded tax supporting
                    documents.
                  </div>
                </div>

                <button
                  onClick={() => setStep(7)}
                  style={{
                    border: `1.5px solid ${C.primary}`,

                    background: "#fff",

                    color: C.primary,

                    padding: "9px 16px",

                    borderRadius: 10,

                    fontWeight: 700,

                    cursor: "pointer",

                    fontSize: 13,
                  }}
                >
                  Edit
                </button>
              </div>

              <div style={reviewGrid}>
                {/* TAX STATUS */}

                <ReviewItem
                  label="File Income Tax"
                  value={data.fileIncomeTax}
                />

                {/* YES */}

                {data.fileIncomeTax === "Yes" && (
                  <>
                    <ReviewItem
                      label="ITR Current Year"
                      value={data.itrCurrentYear ? "Uploaded ✅" : "Missing ❌"}
                    />

                    <ReviewItem
                      label="ITR Previous Year"
                      value={
                        data.itrPreviousYear ? "Uploaded ✅" : "Missing ❌"
                      }
                    />
                  </>
                )}

                {/* NO */}

                {data.fileIncomeTax === "No" && (
                  <ReviewItem
                    label="Pay After Visa"
                    value={
                      !data.taxPayAfterVisaPackage
                        ? "-"
                        : data.taxPayAfterVisaPackage === "Yes"
                          ? "Pay After Visa Selected ✅"
                          : "Missing ❌"
                    }
                  />
                )}
              </div>
            </div>

            {/* STEP 8 — MARRIAGE */}

            <div style={{ marginBottom: 34 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: C.text,
                      letterSpacing: -0.3,
                    }}
                  >
                    💍 Step 8 — Marriage Documents
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: C.textLight,
                      marginTop: 4,
                    }}
                  >
                    Review spouse and marriage-related supporting documents
                    submitted in the application.
                  </div>
                </div>

                <button
                  onClick={() => setStep(8)}
                  style={{
                    border: `1.5px solid ${C.primary}`,

                    background: "#fff",

                    color: C.primary,

                    padding: "9px 16px",

                    borderRadius: 10,

                    fontWeight: 700,

                    cursor: "pointer",

                    fontSize: 13,
                  }}
                >
                  Edit
                </button>
              </div>

              <div style={reviewGrid}>
                {/* MARRIED STATUS */}

                <ReviewItem label="Married" value={data.isMarried} />

                {/* DOCUMENTS */}

                {data.isMarried === "Yes" && (
                  <>
                    <ReviewItem
                      label="Marriage Certificate"
                      value={
                        data.marriageCertificate ? "Uploaded ✅" : "Missing ❌"
                      }
                    />

                    <ReviewItem
                      label="Spouse Passport"
                      value={data.spousePassport ? "Uploaded ✅" : "Missing ❌"}
                    />

                    <ReviewItem
                      label="Joint Bank Statement"
                      value={
                        data.jointBankStatement ? "Uploaded ✅" : "Missing ❌"
                      }
                    />
                  </>
                )}
              </div>
            </div>
            {/* STEP 9 */}

            <div style={{ marginBottom: 34 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: C.text,
                      letterSpacing: -0.3,
                    }}
                  >
                    👤 Step 9 — Personal Information
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: C.textLight,
                      marginTop: 4,
                    }}
                  >
                    Review personal details, contact information, nationality,
                    family, and {country}-related details.
                  </div>
                </div>

                <button
                  onClick={() => setStep(9)}
                  style={{
                    border: `1.5px solid ${C.primary}`,

                    background: "#fff",

                    color: C.primary,

                    padding: "9px 16px",

                    borderRadius: 10,

                    fontWeight: 700,

                    cursor: "pointer",

                    fontSize: 13,
                  }}
                >
                  Edit
                </button>
              </div>

              <div style={reviewGrid}>
                <ReviewItem label="Phone" value={data.phone} />

                <ReviewItem label="Email" value={data.email} />

                <ReviewItem
                  label="Other Nationality"
                  value={data.otherNationality}
                />

                <ReviewItem
                  label="Current Address Same As Passport"
                  value={data.currentAddressSameAsPassport}
                />

                <ReviewItem
                  label="Mailing Address Same As Current"
                  value={data.mailingAddressSameAsCurrent}
                />

                <ReviewItem
                  label="Residence Duration"
                  value={data.durationAtCurrentResidence}
                />

                <ReviewItem
                  label="Known By Another Name"
                  value={data.everKnownByAnotherName}
                />

                <ReviewItem
                  label="Family Travelling"
                  value={data.familyTravelling}
                />

                <ReviewItem
                  label={`Friends / Relatives In ${country}`}
                  value={data.friendsRelativesInCountry}
                />

                <ReviewItem
                  label="Purpose Of Visit"
                  value={data.purposeOfVisit}
                />
              </div>

              {/* OTHER NATIONALITIES */}

              {data.otherNationality === "Yes" && (
                <div style={{ marginTop: 24 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: C.text,
                      marginBottom: 14,
                    }}
                  >
                    🌍 Other Nationalities
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                    }}
                  >
                    {data.otherNationalities.map((n, i) => (
                      <div
                        key={i}
                        style={{
                          background: C.primaryLight,

                          color: C.primary,

                          padding: "8px 14px",

                          borderRadius: 999,

                          fontSize: 13,

                          fontWeight: 600,
                        }}
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* OTHER NAMES */}

              {data.everKnownByAnotherName === "Yes" && (
                <div style={{ marginTop: 24 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: C.text,
                      marginBottom: 14,
                    }}
                  >
                    🪪 Other Names
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                    }}
                  >
                    {data.otherNames.map((n, i) => (
                      <div
                        key={i}
                        style={{
                          background: "#F1F5F9",

                          padding: "8px 14px",

                          borderRadius: 999,

                          fontSize: 13,
                        }}
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAMILY MEMBERS */}

              {data.familyTravelling === "Yes" && (
                <div style={{ marginTop: 28 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: C.text,
                      marginBottom: 14,
                    }}
                  >
                    👨‍👩‍👧 Family members travelling with you
                  </div>

                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "#F8FAFC",
                        }}
                      >
                        <th style={tableHead}>Name</th>
                        <th style={tableHead}>Relationship</th>
                        <th style={tableHead}>Date of Birth</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.familyMembers.map((m, i) => (
                        <tr key={i}>
                          <td style={tableCell}>{m.name}</td>
                          <td style={tableCell}>{m.relationship}</td>
                          <td style={tableCell}>{m.dob}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Country CONTACTS */}

              {data.friendsRelativesInCountry === "Yes" && (
                <div style={{ marginTop: 28 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: C.text,
                      marginBottom: 14,
                    }}
                  >
                    {`👨‍👩‍👧 Friends or relatives in ${country}`}
                  </div>

                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "#F8FAFC",
                        }}
                      >
                        <th style={tableHead}>Name</th>
                        <th style={tableHead}>Passport Number</th>
                        <th style={tableHead}>Date of Birth</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.countryContacts.map((c, i) => (
                        <tr key={i}>
                          <td style={tableCell}>{c.name}</td>
                          <td style={tableCell}>{c.passportNumber}</td>
                          <td style={tableCell}>{c.dob}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* STEP 10 */}

            <div style={{ marginBottom: 34 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: C.text,
                      letterSpacing: -0.3,
                    }}
                  >
                    💳 Step 10 — Trip Sponsorship
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: C.textLight,
                      marginTop: 4,
                    }}
                  >
                    Review sponsor details and uploaded sponsorship supporting
                    documents.
                  </div>
                </div>

                <button
                  onClick={() => setStep(10)}
                  style={{
                    border: `1.5px solid ${C.primary}`,

                    background: "#fff",

                    color: C.primary,

                    padding: "9px 16px",

                    borderRadius: 10,

                    fontWeight: 700,

                    cursor: "pointer",

                    fontSize: 13,
                  }}
                >
                  Edit
                </button>
              </div>

              <div style={reviewGrid}>
                <ReviewItem
                  label="Trip Sponsor"
                  value={data.tripSponsor || "-"}
                />

                {/* FAMILY / EMPLOYER */}

                {(data.tripSponsor === "Family" ||
                  data.tripSponsor === "Employer") && (
                  <>
                    <ReviewItem
                      label="Sponsorship Letter"
                      value={data.sponsorLetter ? "Uploaded ✅" : "Missing ❌"}
                    />

                    <ReviewItem
                      label="Sponsor Bank Statement"
                      value={
                        data.sponsorBankStatement ? "Uploaded ✅" : "Missing ❌"
                      }
                    />

                    <ReviewItem
                      label="Sponsor ITR"
                      value={data.sponsorItr ? "Uploaded ✅" : "Missing ❌"}
                    />

                    <ReviewItem
                      label="Sponsor ID Proof"
                      value={data.sponsorIdProof ? "Uploaded ✅" : "Missing ❌"}
                    />
                  </>
                )}

                {/* OVERSEAS RELATIVE */}

                {data.tripSponsor === "Overseas Relative" && (
                  <>
                    <ReviewItem
                      label="Sponsorship Letter"
                      value={
                        data.overseasSponsorLetter
                          ? "Uploaded ✅"
                          : "Missing ❌"
                      }
                    />

                    <ReviewItem
                      label="Sponsor Bank Statement"
                      value={
                        data.overseasSponsorBankStatement
                          ? "Uploaded ✅"
                          : "Missing ❌"
                      }
                    />

                    <ReviewItem
                      label="Tax Return Statement"
                      value={
                        data.overseasTaxReturn ? "Uploaded ✅" : "Missing ❌"
                      }
                    />

                    <ReviewItem
                      label="Passport Of Overseas Relative"
                      value={
                        data.overseasRelativePassport
                          ? "Uploaded ✅"
                          : "Missing ❌"
                      }
                    />
                  </>
                )}

                {/* PAY AFTER VISA */}

                {data.tripSponsor === "Pay After Visa Package" && (
                  <ReviewItem
                    label="Pay After Visa Package"
                    value={data.tripPayAfterVisaPackage || "-"}
                  />
                )}
              </div>
            </div>

            {/* STEP 11 */}

            <div style={{ marginBottom: 34 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: C.text,
                      letterSpacing: -0.3,
                    }}
                  >
                    ✈️ Step 11 — Travel History
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: C.textLight,
                      marginTop: 4,
                    }}
                  >
                    Review international travel history and previous visa
                    refusal details provided in the application.
                  </div>
                </div>

                <button
                  onClick={() => setStep(11)}
                  style={{
                    border: `1.5px solid ${C.primary}`,

                    background: "#fff",

                    color: C.primary,

                    padding: "9px 16px",

                    borderRadius: 10,

                    fontWeight: 700,

                    cursor: "pointer",

                    fontSize: 13,
                  }}
                >
                  Edit
                </button>
              </div>

              <div style={reviewGrid}>
                <ReviewItem
                  label="Travelled Last 5 Years"
                  value={data.travelHistoryLast5Years}
                />

                <ReviewItem label="Visa Refused" value={data.visaDenied} />
              </div>

              {/* TRAVEL HISTORY TABLE */}

              {data.travelHistoryLast5Years === "Yes" && (
                <div style={{ marginTop: 28 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: C.text,
                      marginBottom: 14,
                    }}
                  >
                    🌍 Countries Visited
                  </div>

                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "#F8FAFC",
                        }}
                      >
                        <th style={tableHead}>Country</th>

                        <th style={tableHead}>From Date</th>

                        <th style={tableHead}>To Date</th>

                        <th style={tableHead}>Visa Copy</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.travelHistory.map((t, i) => (
                        <tr key={i}>
                          <td style={tableCell}>{t.country}</td>

                          <td style={tableCell}>{t.fromDate}</td>

                          <td style={tableCell}>{t.toDate}</td>

                          <td style={tableCell}>
                            {t.visaFile ? "Uploaded ✅" : "Not Uploaded"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* VISA REFUSAL */}

              {data.visaDenied === "Yes" && (
                <div style={{ marginTop: 28 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: C.text,
                      marginBottom: 14,
                    }}
                  >
                    🚫 Visa Refusal Countries
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                    }}
                  >
                    {data.deniedCountries.map((c, i) => (
                      <div
                        key={i}
                        style={{
                          background: "#FEE2E2",

                          color: "#B91C1C",

                          padding: "8px 14px",

                          borderRadius: 999,

                          fontSize: 13,

                          fontWeight: 600,
                        }}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* STEP 12 */}

              <div style={{ marginBottom: 34 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 18,
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: C.text,
                        letterSpacing: -0.3,
                      }}
                    >
                      📁 Step 12 — Documents
                    </div>

                    <div
                      style={{
                        fontSize: 13,
                        color: C.textLight,
                        marginTop: 4,
                      }}
                    >
                      Review uploaded identity, itinerary, and supporting visa
                      application documents.
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(12)}
                    style={{
                      border: `1.5px solid ${C.primary}`,

                      background: "#fff",

                      color: C.primary,

                      padding: "9px 16px",

                      borderRadius: 10,

                      fontWeight: 700,

                      cursor: "pointer",

                      fontSize: 13,
                    }}
                  >
                    Edit
                  </button>
                </div>

                <div style={reviewGrid}>
                  <ReviewItem
                    label="Travel Itinerary"
                    value={data.travelItinerary ? "Uploaded ✅" : "Missing ❌"}
                  />

                  <ReviewItem
                    label="Pan Card"
                    value={data.panCard ? "Uploaded ✅" : "Missing ❌"}
                  />

                  <ReviewItem
                    label="Visa Stamps"
                    value={data.visaStamps ? "Uploaded ✅" : "Optional"}
                  />

                  <ReviewItem
                    label="Aadhaar Card"
                    value={data.aadhaarCard ? "Uploaded ✅" : "Missing ❌"}
                  />

                  <ReviewItem
                    label="Cover Letter"
                    value={data.coverLetter ? "Uploaded ✅" : "Missing ❌"}
                  />
                </div>
              </div>
            </div>

            <div style={dividerStyle} />

            {/* DECLARATION */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 22,
              }}
            >
              <label style={checkboxLabel}>
                <input
                  type="checkbox"
                  checked={data.confirmEnteredData}
                  onChange={(e) => set("confirmEnteredData", e.target.checked)}
                  style={checkboxStyle}
                />

                <span>
                  I confirm that all entered information is accurate and
                  verified by me.
                </span>
              </label>

              <label style={checkboxLabel}>
                <input
                  type="checkbox"
                  checked={data.acceptTerms}
                  onChange={(e) => set("acceptTerms", e.target.checked)}
                  style={checkboxStyle}
                />

                <span>I accept all terms and conditions.</span>
              </label>
            </div>
          </Card>
        )}

        {/* ── Nav Bar ── */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            background: C.card,
            borderRadius: 12,
            padding: "14px 16px",
            border: `1px solid ${C.border}`,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <button
            onClick={goBack}
            disabled={step === 1}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "10px 16px",
              minWidth: 100,
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              border: `1.5px solid ${step === 1 ? C.border : C.primary}`,
              background: step === 1 ? C.bg : "transparent",
              color: step === 1 ? C.textLight : C.primary,
              cursor: step === 1 ? "not-allowed" : "pointer",
              flex: "1 1 120px",
            }}
          >
            ← Back
          </button>

          <div
            style={{
              display: "flex",
              gap: 5,
              justifyContent: "center",
              alignItems: "center",
              flex: "0 1 auto",
            }}
          >
            {STEPS.map((s) => (
              <div
                key={s.id}
                style={{
                  width: s.id === step ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background:
                    s.id === step
                      ? C.primary
                      : completed.includes(s.id)
                        ? C.success
                        : C.border,
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>

          {step < STEPS.length ? (
            <button
              onClick={goNext}
              disabled={!isCurrentStepValid()}
              style={{
                opacity: isCurrentStepValid() ? 1 : 0.5,
                cursor: isCurrentStepValid() ? "pointer" : "not-allowed",
                background: isCurrentStepValid() ? C.primary : "#94A3B8",
                color: "#fff",
                border: "none",
                padding: "12px 16px",
                borderRadius: 10,
                fontWeight: 700,
                minWidth: 150,
                flex: "1 1 180px",
                transition: "all 0.2s",
              }}
            >
              Save & Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={async () => {
                const allErrors = {
                  ...validateStep(1),

                  ...validateStep(2),

                  ...validateStep(3),

                  ...validateStep(4),

                  ...validateStep(5),

                  ...validateStep(6),

                  ...validateStep(7),

                  ...validateStep(8),

                  ...validateStep(9),

                  ...validateStep(10),

                  ...validateStep(11),

                  ...validateStep(12),

                  ...validateStep(13),
                };

                // ======================
                // VALIDATION
                // ======================

                // if (Object.keys(allErrors).length) {
                //   setErrors(allErrors);

                //   alert(
                //     "Please complete all required fields and documents before submission.",
                //   );

                //   return;
                // }

                try {
                  setErrors({});

                  // ======================
                  // SAVE APPLICATION
                  // ======================

                  // ======================
                  // CREATE FORMDATA
                  // ======================

                  const formData = new FormData();

                  // ======================
                  // LOOP ALL DATA
                  // ======================

                  Object.entries(data).forEach(([key, value]) => {
                    // ======================
                    // UNDEFINED
                    // ======================

                    if (value === undefined) {
                      return;
                    }

                    // ======================
                    // TRAVEL HISTORY
                    // ======================

                    if (key === "travelHistory") {
                      // REMOVE FILE OBJECTS

                      const cleanedTravelHistory = value.map((trip) => ({
                        country: trip.country || "",

                        fromDate: trip.fromDate || "",

                        toDate: trip.toDate || "",

                        visaFile: null,
                      }));

                      // SAVE TRAVEL HISTORY

                      formData.append(
                        "travelHistory",

                        JSON.stringify(cleanedTravelHistory),
                      );

                      // SAVE VISA FILES

                      value.forEach((trip, index) => {
                        if (trip.visaFile) {
                          formData.append(
                            `travelVisaFile_${index}`,

                            trip.visaFile,
                          );
                        }
                      });

                      return;
                    }

                    // ======================
                    // FILE OR NULL FILE
                    // ======================

                    if (value instanceof File || value === null) {
                      // NULL FILE

                      if (value === null) {
                        formData.append(key, "null");
                      }

                      // REAL FILE
                      else {
                        formData.append(key, value);
                      }

                      return;
                    }

                    // ======================
                    // ARRAY / OBJECT
                    // ======================

                    if (typeof value === "object") {
                      formData.append(
                        key,

                        JSON.stringify(value),
                      );

                      return;
                    }

                    // ======================
                    // NORMAL VALUES
                    // ======================

                    formData.append(
                      key,

                      value === "" ? "null" : value,
                    );
                  });

                  // ======================
                  // EXTRA FIELDS
                  // ======================

                  formData.append("country", country);

                  formData.append("submittedAt", new Date().toISOString());
                  // ======================
                  // API CALL
                  // ======================

                  const response = await createApplication(formData);
                  // ======================
                  // SUCCESS
                  // ======================

                  alert(
                    `✅ Application Submitted Successfully!
                      Reference ID:
                      ${
                        response?.application?.applicationId ||
                        "VISA-APPLICATION"
                      }

                      Our team will contact you shortly regarding payment and application processing.`,
                  );
                  console.log("Application Saved:", response);
                } catch (error) {
                  console.log(error);

                  alert("❌ Failed to submit application. Please try again.");
                }
              }}
              // disabled={!data.confirmEnteredData || !data.acceptTerms}
              disabled={false}
              style={{
                display: "flex",

                alignItems: "center",

                gap: 8,

                padding: "9px 26px",

                borderRadius: 8,

                fontSize: 14,

                fontWeight: 700,

                background:
                  data.confirmEnteredData && data.acceptTerms
                    ? `linear-gradient(135deg, ${C.success} 0%, #10B981 100%)`
                    : "#CBD5E1",

                border: "none",

                color: "#fff",

                cursor:
                  data.confirmEnteredData && data.acceptTerms
                    ? "pointer"
                    : "not-allowed",

                boxShadow:
                  data.confirmEnteredData && data.acceptTerms
                    ? "0 4px 14px rgba(5,150,105,0.3)"
                    : "none",

                transition: "all 0.2s",
              }}
            >
              Proceed to Secure Payment →
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        button:hover:not(:disabled) { filter: brightness(1.06); transform: translateY(-1px); }
        input[type="time"]::-webkit-calendar-picker-indicator { opacity: 0.5; cursor: pointer; }
        * { -webkit-font-smoothing: antialiased; }
      `}</style>
    </div>
  );
}
