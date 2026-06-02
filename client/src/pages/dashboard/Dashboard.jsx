import { Helmet } from "react-helmet-async";

import Navbar from "../../components/layout/Navbar";

import VisaPage from "../visas/VisaPage";

import Footer from "../../components/layout/Footer";

const Dashboard = () => {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Dashboard - TMS VISA</title>

        <meta
          name="description"
          content="
            Explore visa services
            for different countries
          "
        />
      </Helmet>

      {/* PAGE */}
      <div className="min-h-screen bg-[#edf5f7]">
        {/* NAVBAR */}
        <Navbar />

        {/* VISA PAGE */}
        <VisaPage />
      </div>
      <Footer/>
    </>
  );
};

export default Dashboard;
