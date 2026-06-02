import {
  useParams,
} from "react-router-dom";

import VisaForm
from "../pages/forms/VisaForm";

export default function VisaFormRouter() {

  const {
    countryName,
  } = useParams();

  const country =
    countryName
      ?.toLowerCase()
      ?.trim();

  // ======================
  // VALID COUNTRIES
  // ======================

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
  // INVALID COUNTRY
  // ======================

  if (
    !validCountries.includes(
      country
    )
  ) {

    return (

      <div
        style={{
          minHeight: "100vh",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          fontSize: 32,

          fontWeight: 700,
        }}
      >
        Form Not Found
      </div>
    );
  }

  // ======================
  // REUSABLE FORM
  // ======================

  return (

    <VisaForm />

  );
}