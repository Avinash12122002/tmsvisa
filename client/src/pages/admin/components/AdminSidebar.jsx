import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const menus = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Applications",
    path: "/admin/applications",
  },
  {
    label: "Users",
    path: "/admin/users",
  },
  {
    label: "Payments",
    path: "/admin/payments",
  },
  {
    label: "Analytics",
    path: "/admin/analytics",
  },
  {
    label: "Settings",
    path: "/admin/settings",
  },
];

const SCROLL_KEY = "adminSidebarScrollTop";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const [showLeads, setShowLeads] = useState(false);

  const [showJobs, setShowJobs] = useState(false);

  const asideRef = useRef(null);

  useEffect(() => {
    if (location.pathname.includes("/admin/leads")) {
      setShowLeads(true);
    }

    if (
      location.pathname.includes("/admin/jobs") ||
      location.pathname.includes("/admin/job")
    ) {
      setShowJobs(true);
    }
  }, [location.pathname]);

  // Restore scroll position after every render (covers toggles, route
  // changes, or any parent re-render that resets the DOM's scrollTop).
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);

    if (asideRef.current && saved !== null) {
      asideRef.current.scrollTop = Number(saved);
    }
  });

  const handleSidebarScroll = () => {
    if (asideRef.current) {
      sessionStorage.setItem(
        SCROLL_KEY,
        String(asideRef.current.scrollTop)
      );
    }
  };

  const closeMobileSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const menuStyle = (path) => ({
  display: "block",
  padding: "10px 14px",
  borderRadius: 8,
  marginBottom: 4,
  textDecoration: "none",
  color: "#fff",
  fontSize: 13,
  fontWeight: location.pathname === path ? 600 : 500,
  background: location.pathname === path ? "#2563EB" : "transparent",
  transition: "0.2s",
});
 const subMenuStyle = (path) => ({
  display: "block",
  padding: "8px 12px",
  borderRadius: 8,
  marginBottom: 4,
  marginLeft: 12,
  textDecoration: "none",
  fontSize: 12,
  color: location.pathname === path ? "#fff" : "#CBD5E1",
  background: location.pathname === path ? "#1E40AF" : "transparent",
  transition: "0.2s",
});

  return (
    <>
      {/* Overlay */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            md:hidden
          "
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}

      <aside
        ref={asideRef}
        onScroll={handleSidebarScroll}
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-[235px]
          bg-slate-950
          text-white
          overflow-y-auto
          z-50
          transition-transform
          duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
      >
        {/* Mobile Close */}

        <button
          type="button"
          onClick={closeMobileSidebar}
          className="
            md:hidden
            absolute
            top-3
            right-3
            text-xl
            "
        >
          ×
        </button>

        {/* Logo */}

        <div className="px-4 py-4 border-b border-slate-800">
  <h1 className="text-xl font-bold tracking-wide">
    Visa CRM
  </h1>

  <p className="text-slate-400 text-xs mt-1">
    Admin Dashboard
  </p>
</div>

        {/* Menu Area */}

        <div className="p-3">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              style={menuStyle(menu.path)}
              onClick={closeMobileSidebar}
            >
              {menu.label}
            </Link>
          ))}

          {/* Leads */}

          <button
            type="button"
            onClick={() => setShowLeads(!showLeads)}
            className="
              w-full
              flex
              justify-between
              items-center
              bg-slate-800
              px-3
              py-2
              rounded-lg
              mt-3
              mb-1
              text-sm
              hover:bg-slate-700
              transition
              "
          >
            <span>🎯 Leads</span>

            <span>{showLeads ? "▼" : "▶"}</span>
          </button>

          {showLeads && (
            <div className="mb-4">
              <Link
                to="/admin/leads-dashboard"
                style={subMenuStyle("/admin/leads-dashboard")}
                onClick={closeMobileSidebar}
              >
                Lead Dashboard
              </Link>

              {/* <Link
                to="/admin/leads"
                style={subMenuStyle("/admin/leads")}
                onClick={closeMobileSidebar}
              >
                All Leads
              </Link> */}

              <Link
                to="/admin/leads/work-visa"
                style={subMenuStyle("/admin/leads/work-visa")}
                onClick={closeMobileSidebar}
              >
                Work Visa Leads
              </Link>

              <Link
                to="/admin/leads/tourist-visa"
                style={subMenuStyle("/admin/leads/tourist-visa")}
                onClick={closeMobileSidebar}
              >
                Tourist Visa Leads
              </Link>

              <Link
                to="/admin/leads/visa-ai"
                style={subMenuStyle("/admin/leads/visa-ai")}
                onClick={closeMobileSidebar}
              >
                Visa AI Leads
              </Link>

              {/* <Link
                to="/admin/leads/visa-courses"
                style={subMenuStyle("/admin/leads/visa-courses")}
                onClick={closeMobileSidebar}
              >
                Visa Course Leads
              </Link> */}

              <Link
                to="/admin/leads/consultations"
                style={subMenuStyle("/admin/leads/consultations")}
                onClick={closeMobileSidebar}
              >
                Consultation Leads
              </Link>
            </div>
          )}

          {/* Jobs */}

          <button
            type="button"
            onClick={() => setShowJobs(!showJobs)}
           className="
            w-full
            flex
            justify-between
            items-center
            bg-slate-800
            px-3
            py-2
            rounded-lg
            mb-1
            text-sm
            hover:bg-slate-700
            transition
            "
          >
            <span>💼 Jobs</span>

            <span>{showJobs ? "▼" : "▶"}</span>
          </button>

          {showJobs && (
            <div>
              <Link
                to="/admin/job-dashboard"
                style={subMenuStyle("/admin/job-dashboard")}
                onClick={closeMobileSidebar}
              >
                Job Dashboard
              </Link>

              <Link
                to="/admin/jobs"
                style={subMenuStyle("/admin/jobs")}
                onClick={closeMobileSidebar}
              >
                Manage Jobs
              </Link>

              <Link
                to="/admin/jobs/create"
                style={subMenuStyle("/admin/jobs/create")}
                onClick={closeMobileSidebar}
              >
                Create Job
              </Link>

              <Link
                to="/admin/job-applications"
                style={subMenuStyle("/admin/job-applications")}
                onClick={closeMobileSidebar}
              >
                Job Applications
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}