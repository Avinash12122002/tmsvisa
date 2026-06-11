import { Link, NavLink, useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    {
      name: "Home",
      path: "https://mediumseagreen-wallaby-486481.hostingersite.com/",
    },
    {
      name: "Visa Ai",
      path: "https://mediumseagreen-wallaby-486481.hostingersite.com/visa-ai/",
    },
    {
      name: "Work Visa",
      path: "https://mediumseagreen-wallaby-486481.hostingersite.com/work-visa/",
    },
    {
      name: "Turist Visa",
      path: "https://mediumseagreen-wallaby-486481.hostingersite.com/tourist-visa/",
    },
    {
      name: "Visa Courses",
      path: "https://mediumseagreen-wallaby-486481.hostingersite.com/visa-courses/",
    },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* LOGO */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <h1
            className="
              text-2xl
              font-black
              tracking-tight
              text-gray-900
            "
          >
            TMS<span className="text-blue-600">VISA</span>
          </h1>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="
                text-[15px]
                font-medium
                text-gray-700
                hover:text-blue-600
                transition-all
                duration-200
                relative
              "
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* RIGHT */}
        
        {/* <div className="flex items-center gap-4"> */}
          {/* USER NAME */}
          {/* <div className="hidden lg:flex flex-col leading-tight"> */}
            {/* <span className="text-xs text-gray-400">Welcome back</span>

            <span className="text-sm font-semibold text-gray-800">
              {user?.name}
            </span> */}
          {/* </div> */}

          {/* PROFILE */}
          {/* <div className="relative group">
            <button
              className="
                h-11
                px-4
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                flex
                items-center
                gap-2
                transition-all
                duration-200
                shadow-sm
              "
            >
              <User size={18} />

              <span className="text-sm font-semibold">Account</span>

              <ChevronDown size={16} />
            </button> */}

            {/* DROPDOWN */}
            {/* <div
              className="
                absolute
                right-0
                mt-3
                w-64
                bg-white
                rounded-2xl
                border
                border-gray-100
                shadow-2xl
                opacity-0
                invisible
                group-hover:opacity-100
                group-hover:visible
                transition-all
                duration-200
                overflow-hidden
                z-50
              "
            > */}
              {/* USER INFO */}
              {/* <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">{user?.name}</h3>

                <p className="text-sm text-gray-500 break-all mt-1">
                  {user?.email}
                </p>
              </div> */}

              {/* DASHBOARD */}
              {/* <Link
                to="/dashboard"
                className="
                  block
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-gray-700
                  hover:bg-gray-50
                  transition
                "
              >
                Dashboard
              </Link> */}

              {/* LOGOUT */}
              {/* <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="
                  w-full
                  px-5
                  py-3
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-red-600
                  hover:bg-red-50
                  transition
                "
              >
                <LogOut size={16} />
                Logout
              </button> */}
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
