import Footer from "../../components/layout/Footer";

import {
  ShieldCheck,
  Globe,
  FileText,
  Scale,
  ChevronRight,
} from "lucide-react";

const TermsPage = () => {
  const sections = [
    {
      icon: <FileText size={18} />,
      title: "User Agreement",
      desc: "Users accessing TMS VISA services agree to comply with all legal policies and operational guidelines.",
    },

    {
      icon: <ShieldCheck size={18} />,
      title: "Visa Disclaimer",
      desc: "Visa approvals and immigration decisions remain under the authority of embassies and immigration departments.",
    },

    {
      icon: <Globe size={18} />,
      title: "Third-Party Services",
      desc: "External links and partner services are provided for convenience only and are not controlled by TMS VISA.",
    },

    {
      icon: <Scale size={18} />,
      title: "Legal Compliance",
      desc: "Users must provide accurate information and comply with all immigration and travel regulations.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HERO */}
      <section
        className="
          relative
          overflow-hidden
          bg-[#071B4D]
          px-6
          pt-16
          pb-20
        "
      >
        {/* BACKGROUND */}
        <div
          className="
            absolute
            top-0
            right-0
            w-[400px]
            h-[400px]
            bg-blue-500/10
            blur-3xl
            rounded-full
          "
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* BADGE */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              bg-white/10
              border
              border-white/10
              text-white
              px-4
              py-2
              rounded-full
              text-sm
              font-medium
              mb-7
            "
          >
            <ShieldCheck size={14} />
            Legal Documentation
          </div>

          {/* TITLE */}
          <h1
            className="
              text-white
              text-5xl
              md:text-6xl
              font-black
              leading-[1.1]
              tracking-tight
              max-w-4xl
            "
          >
            Terms &<span className="text-blue-400"> Conditions</span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              text-blue-100/80
              text-base
              leading-8
              max-w-3xl
              mt-5
            "
          >
            Please read these terms carefully before using TMS VISA services. By
            accessing our platform, you agree to all policies, operational
            guidelines, and legal conditions outlined below.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        {/* TOP CARD */}
        <div
          className="
            bg-white
            shadow-[0_10px_30px_rgba(0,0,0,0.06)]
            rounded-[28px]
            p-8
            md:p-10
            border
            border-gray-100
          "
        >
          <div className="flex flex-col gap-10">
            {/* TOP CONTENT */}
            <div>
              <span
                className="
                  text-blue-600
                  font-semibold
                  text-xs
                  uppercase
                  tracking-widest
                "
              >
                TMS VISA POLICY
              </span>

              <h2
                className="
    text-2xl
    md:text-3xl
    font-black
    text-gray-900
    mt-4
    leading-tight
    max-w-[700px]
  "
              >
                Trusted Visa & Immigration Assistance
              </h2>

              <p
                className="
                  mt-5
                  text-gray-600
                  leading-6
                  text-[15px]
                  max-w-[700px]
                "
              >
                TMS VISA provides professional visa consultation and online
                application assistance services worldwide.
              </p>

              {/* TRUST LINE */}
              <div className="flex items-center gap-3 mt-5">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />

                <span className="text-sm text-gray-500">
                  Trusted by travelers worldwide
                </span>
              </div>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.map((item, index) => (
                <div
                  key={index}
                  className="
                    group
                    bg-[#f8fafc]
                    hover:bg-[#071B4D]
                    border
                    border-gray-100
                    rounded-2xl
                    p-4
                    transition-all
                    duration-300
                    cursor-pointer
                  "
                >
                  <div className="flex items-start gap-4">
                    {/* ICON */}
                    <div
                      className="
                        min-w-[42px]
                        h-[42px]
                        rounded-xl
                        bg-blue-100
                        text-blue-700
                        flex
                        items-center
                        justify-center
                        group-hover:bg-white/10
                        group-hover:text-white
                        transition-all
                      "
                    >
                      {item.icon}
                    </div>

                    {/* TEXT */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className="
                            text-base
                            font-bold
                            text-gray-900
                            group-hover:text-white
                            transition-all
                          "
                        >
                          {item.title}
                        </h3>

                        <ChevronRight
                          size={16}
                          className="
                            text-gray-400
                            group-hover:text-white
                          "
                        />
                      </div>

                      <p
                        className="
                          text-gray-500
                          group-hover:text-blue-100
                          leading-6
                          mt-2
                          text-[14px]
                          transition-all
                        "
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TERMS CONTENT */}
        <div
          className="
            mt-10
            bg-white
            rounded-[28px]
            p-8
            md:p-10
            shadow-[0_10px_30px_rgba(0,0,0,0.04)]
            border
            border-gray-100
          "
        >
          <div className="max-w-5xl">
            <span
              className="
                text-blue-600
                font-semibold
                uppercase
                tracking-wider
                text-xs
              "
            >
              FULL TERMS & CONDITIONS
            </span>

            <h2
              className="
                text-3xl
                font-black
                text-gray-900
                mt-4
                mb-10
              "
            >
              Legal Terms & User Agreement
            </h2>

            <div
              className="
                space-y-6
                text-gray-600
                text-[15px]
                leading-6
              "
            >
              {/* SECTION */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Agreement Between Company & User
                </h3>

                <div className="space-y-1">
                  <p>
                    This website is operated by TMS VISA and all services are
                    subject to the terms and conditions mentioned below.
                  </p>

                  <p>
                    By accessing this website, users agree to comply with all
                    operational policies and legal guidelines.
                  </p>

                  <p>
                    Continued use of our platform indicates acceptance of all
                    applicable terms and conditions.
                  </p>
                </div>
              </div>

              {/* SECTION */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Personal & Non-Commercial Use
                </h3>

                <p>
                  Users may not reproduce, distribute, transfer, publish, or
                  resell any content or services without written permission from
                  TMS VISA.
                </p>
              </div>

              {/* SECTION */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Third-Party Services
                </h3>

                <div className="space-y-1">
                  <p>
                    This website may contain links to third-party websites for
                    convenience purposes.
                  </p>

                  <p>
                    TMS VISA does not control or endorse third-party websites
                    and is not responsible for their content or services.
                  </p>

                  <p>
                    Users are solely responsible for dealings made with
                    third-party service providers.
                  </p>
                </div>
              </div>

              {/* SECTION */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  No Unlawful Use
                </h3>

                <p>
                  Users agree not to use this website for unlawful activities or
                  actions prohibited under applicable laws and regulations.
                </p>
              </div>

              {/* DISCLAIMER */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Visa Disclaimer
                </h3>

                <div className="space-y-1">
                  <p>
                    TMS VISA assists applicants with visa processing but cannot
                    guarantee visa approval or embassy processing timelines.
                  </p>

                  <p>
                    Embassy decisions and immigration approvals remain solely
                    under the authority of the respective immigration
                    departments.
                  </p>

                  <p>
                    Applicants are responsible for ensuring all documents and
                    submitted information are complete and accurate.
                  </p>

                  <p>
                    TMS VISA is not liable for losses caused by visa delays,
                    rejections, cancellations, or incorrect applicant details.
                  </p>
                </div>
              </div>

              {/* LAW */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Governing Law
                </h3>

                <p>
                  These terms shall be governed under the laws of India and
                  applicable international regulations.
                </p>
              </div>

              {/* DISPUTE */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Disputes Resolution
                </h3>

                <div className="space-y-1">
                  <p>
                    Users agree to first attempt informal dispute resolution by
                    contacting the Company directly.
                  </p>

                  <p>
                    If disputes remain unresolved, they shall be settled under
                    bahadurgarh jurisdiction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="py-10 text-center text-gray-400 text-sm">
          © 2026 TMS VISA • Legal Department • All Rights Reserved
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
