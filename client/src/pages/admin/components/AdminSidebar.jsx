import { useState, useEffect } from "react";
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

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const [showLeads, setShowLeads] = useState(false);

  const [showJobs, setShowJobs] = useState(false);

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

  const closeMobileSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const menuStyle = (path) => ({
    display: "block",
    padding: "14px 18px",
    borderRadius: 12,
    marginBottom: 8,
    textDecoration: "none",
    color: "#fff",
    fontSize: 15,
    fontWeight: location.pathname === path ? 600 : 500,
    background: location.pathname === path ? "#2563EB" : "transparent",
  });

  const subMenuStyle = (path) => ({
    display: "block",
    padding: "10px 14px",
    borderRadius: 10,
    marginBottom: 6,
    marginLeft: 16,
    textDecoration: "none",
    fontSize: 14,
    color: location.pathname === path ? "#fff" : "#CBD5E1",
    background: location.pathname === path ? "#1E40AF" : "transparent",
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
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-[280px]
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
          onClick={closeMobileSidebar}
          className="
            md:hidden
            absolute
            top-4
            right-4
            text-2xl
          "
        >
          ×
        </button>

        {/* Logo */}

        <div className="p-6 border-b border-slate-800">
          <h1 className="text-3xl font-bold">Visa CRM</h1>

          <p className="text-slate-400 text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Menu Area */}

        <div className="p-4">
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
            onClick={() => setShowLeads(!showLeads)}
            className="
              w-full
              flex
              justify-between
              items-center
              bg-slate-800
              px-4
              py-3
              rounded-xl
              mt-4
              mb-2
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

              <Link
                to="/admin/leads"
                style={subMenuStyle("/admin/leads")}
                onClick={closeMobileSidebar}
              >
                All Leads
              </Link>

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

              <Link
                to="/admin/leads/visa-courses"
                style={subMenuStyle("/admin/leads/visa-courses")}
                onClick={closeMobileSidebar}
              >
                Visa Course Leads
              </Link>
            </div>
          )}

          {/* Jobs */}

          <button
            onClick={() => setShowJobs(!showJobs)}
            className="
              w-full
              flex
              justify-between
              items-center
              bg-slate-800
              px-4
              py-3
              rounded-xl
              mb-2
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
