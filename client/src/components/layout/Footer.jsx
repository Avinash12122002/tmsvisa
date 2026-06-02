import { Mail, MapPin, Phone } from "lucide-react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#06152E] text-white mt-20 border-t border-white/10">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* COMPANY */}
          <div>
            <h2 className="text-3xl font-black tracking-tight">
              TMS<span className="text-blue-400">VISA</span>
            </h2>

            <p className="text-gray-400 leading-6 text-sm mt-5">
              TMS VISA provides professional visa consultation and immigration
              assistance services for travelers worldwide.
            </p>

            {/* TRUST BADGE */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-white/5
                border
                border-white/10
                rounded-xl
                px-4
                py-3
                mt-6
              "
            >
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />

              <span className="text-sm text-gray-300">
                Trusted by global travelers
              </span>
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-lg font-bold mb-5">Services</h3>

            <div className="flex flex-col gap-3 text-gray-400 text-sm">
              <Link
                to="/dashboard"
                className="hover:text-blue-400 transition-all"
              >
                Visa Assistance
              </Link>

              <Link
                to="/dashboard"
                className="hover:text-blue-400 transition-all"
              >
                Tourist Visa
              </Link>

              <Link
                to="/dashboard"
                className="hover:text-blue-400 transition-all"
              >
                Business Visa
              </Link>

              <Link
                to="/dashboard"
                className="hover:text-blue-400 transition-all"
              >
                Immigration Support
              </Link>
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-lg font-bold mb-5">Legal</h3>

            <div className="flex flex-col gap-3 text-gray-400 text-sm">
              <Link to="/terms" className="hover:text-blue-400 transition-all">
                Terms & Conditions
              </Link>

              <Link
                to="/privacy-policy"
                className="hover:text-blue-400 transition-all"
              >
                Privacy Policy
              </Link>

              <Link
                to="/refund-policy"
                className="hover:text-blue-400 transition-all"
              >
                Refund & Cancellation
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-bold mb-5">Contact</h3>

            <div className="flex flex-col gap-4 text-gray-400 text-sm">
              {/* ADDRESS */}
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-blue-400" />

                <p>
                  Bahadurgarh, Haryana,
                  <br />
                  India
                </p>
              </div>

              {/* PHONE */}
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-400" />

                <p>+91 8168226462</p>
              </div>

              {/* EMAIL */}
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />

                <p>support@tmsvisa.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            py-5
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-4
          "
        >
          <p
            className="
              text-gray-500
              text-sm
              text-center
              md:text-left
            "
          >
            © 2026 TMS VISA. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/terms" className="hover:text-blue-400 transition-all">
              Terms
            </Link>

            <Link
              to="/privacy-policy"
              className="hover:text-blue-400 transition-all"
            >
              Privacy
            </Link>

            <Link
              to="/refund-policy"
              className="hover:text-blue-400 transition-all"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
