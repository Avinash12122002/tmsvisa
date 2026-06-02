// import { useParams } from "react-router-dom";

// import CountryDescriptions
// from "../CountryDescriptions/CountryDescriptions";

// export default function CountryDescription() {

//   const {
//     countryName,
//   } = useParams();
//   // ======================
//   // COUNTRY
//   // ======================

//   const country =
//     countryName
//       ?.toLowerCase()
//       ?.trim();

//   // ======================
//   // VALID COUNTRIES
//   // ======================

//   const validCountries = [

//     "australia",

//     "canada",

//     "uk",

//     "united-kingdom",

//     "new-zealand",

//     "newzealand",

//     "dubai",

//     "usa",

//     "united states",
//   ];

//   // ======================
//   // COUNTRY NOT FOUND
//   // ======================

//   if (
//     !validCountries.includes(
//       country
//     )
//   ) {

//     return (

//       <div
//         style={{
//           minHeight: "100vh",

//           display: "flex",

//           justifyContent: "center",

//           alignItems: "center",

//           fontSize: 32,

//           fontWeight: 700,
//         }}
//       >
//         Country Page Not Found
//       </div>
//     );
//   }

//   // ======================
//   // MAIN UI
//   // ======================

//   return (

//     <>
//       <CountryDescriptions/>
//     </>
//   );
// }