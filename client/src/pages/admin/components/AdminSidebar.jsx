import { useState } from "react";
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

  const [showJobs, setShowJobs] = useState(false);

  const [showLeads, setShowLeads] = useState(false);

  const menuStyle = (path) => ({
    display: "block",
    padding: "14px 18px",
    borderRadius: 12,
    marginBottom: 10,
    textDecoration: "none",
    color: "#fff",
    background: location.pathname === path ? "#2563EB" : "transparent",
  });

  const subMenuStyle = (path) => ({
    display: "block",
    padding: "10px 14px",
    borderRadius: 10,
    marginBottom: 6,
    marginLeft: 15,
    textDecoration: "none",
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
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-[250px]
          bg-slate-950
          text-white
          p-6
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
          onClick={() => setSidebarOpen(false)}
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

        <h2 className="text-3xl font-bold mb-10">Visa CRM</h2>

        {/* Main Menus */}

        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            style={menuStyle(menu.path)}
            onClick={() => setSidebarOpen(false)}
          >
            {menu.label}
          </Link>
        ))}

        {/* Leads */}

        <button
          onClick={() => setShowLeads(!showLeads)}
          className="
            w-full
            text-left
            bg-slate-800
            px-4
            py-3
            rounded-xl
            mt-4
            mb-2
          "
        >
          🎯 Leads
        </button>

        {showLeads && (
          <div className="mb-4">
            <Link
              to="/admin/leads-dashboard"
              style={subMenuStyle("/admin/leads-dashboard")}
            >
              Lead Dashboard
            </Link>

            <Link to="/admin/leads" style={subMenuStyle("/admin/leads")}>
              All Leads
            </Link>

            <Link
              to="/admin/leads/work-visa"
              style={subMenuStyle("/admin/leads/work-visa")}
            >
              Work Visa Leads
            </Link>

            <Link
              to="/admin/leads/tourist-visa"
              style={subMenuStyle("/admin/leads/tourist-visa")}
            >
              Tourist Visa Leads
            </Link>

            <Link
              to="/admin/leads/visa-ai"
              style={subMenuStyle("/admin/leads/visa-ai")}
            >
              Visa AI Leads
            </Link>

            <Link
              to="/admin/leads/visa-courses"
              style={subMenuStyle("/admin/leads/visa-courses")}
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
            text-left
            bg-slate-800
            px-4
            py-3
            rounded-xl
            mb-2
          "
        >
          💼 Jobs
        </button>

        {showJobs && (
          <div>
            <Link
              to="/admin/job-dashboard"
              style={subMenuStyle("/admin/job-dashboard")}
            >
              Job Dashboard
            </Link>

            <Link to="/admin/jobs" style={subMenuStyle("/admin/jobs")}>
              Manage Jobs
            </Link>

            <Link
              to="/admin/jobs/create"
              style={subMenuStyle("/admin/jobs/create")}
            >
              Create Job
            </Link>

            <Link
              to="/admin/job-applications"
              style={subMenuStyle("/admin/job-applications")}
            >
              Job Applications
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
