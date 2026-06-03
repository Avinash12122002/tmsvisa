import { useState } from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";

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

export default function AdminSidebar() {
  const location = useLocation();

  const [showJobs, setShowJobs] =
    useState(true);

  const [showLeads, setShowLeads] =
    useState(true);

  const menuStyle = (path) => ({
    display: "block",
    padding: "14px 18px",
    borderRadius: 14,
    marginBottom: 10,
    textDecoration: "none",
    color: "white",
    fontSize: 16,
    fontWeight: 500,
    transition: "0.2s",
    background:
      location.pathname === path
        ? "#2563EB"
        : "transparent",
  });

  const subMenuStyle = (path) => ({
    display: "block",
    padding: "10px 14px",
    borderRadius: 10,
    marginBottom: 6,
    marginLeft: 12,
    textDecoration: "none",
    color:
      location.pathname === path
        ? "#fff"
        : "#CBD5E1",
    fontSize: 14,
    fontWeight:
      location.pathname === path
        ? 600
        : 400,
    background:
      location.pathname === path
        ? "#1E40AF"
        : "transparent",
  });

  return (
    <div
      style={{
        width: 250,
        background: "#0F172A",
        color: "white",
        padding: 24,
        height: "100vh",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
      }}
    >
      {/* LOGO */}

      <h2
        style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 35,
        }}
      >
        Visa CRM
      </h2>

      {/* NORMAL MENUS */}

      {menus.map((menu) => (
        <Link
          key={menu.path}
          to={menu.path}
          style={menuStyle(menu.path)}
        >
          {menu.label}
        </Link>
      ))}

      {/* LEADS */}

      <div
        onClick={() =>
          setShowLeads(!showLeads)
        }
        style={{
          padding: "14px 18px",
          borderRadius: 14,
          marginBottom: 10,
          cursor: "pointer",
          fontSize: 16,
          fontWeight: 600,
          background: "#1E293B",
        }}
      >
        🎯 Leads {showLeads ? "▾" : "▸"}
      </div>

      {showLeads && (
        <div
          style={{
            marginBottom: 20,
          }}
        >
          <Link
            to="/admin/leads-dashboard"
            style={subMenuStyle(
              "/admin/leads-dashboard"
            )}
          >
            Lead Dashboard
          </Link>

          <Link
            to="/admin/leads"
            style={subMenuStyle(
              "/admin/leads"
            )}
          >
            All Leads
          </Link>

          <Link
            to="/admin/leads/work-visa"
            style={subMenuStyle(
              "/admin/leads/work-visa"
            )}
          >
            Work Visa Leads
          </Link>

          <Link
            to="/admin/leads/tourist-visa"
            style={subMenuStyle(
              "/admin/leads/tourist-visa"
            )}
          >
            Tourist Visa Leads
          </Link>

          <Link
            to="/admin/leads/visa-ai"
            style={subMenuStyle(
              "/admin/leads/visa-ai"
            )}
          >
            Visa AI Leads
          </Link>

          <Link
            to="/admin/leads/visa-courses"
            style={subMenuStyle(
              "/admin/leads/visa-courses"
            )}
          >
            Visa Course Leads
          </Link>
        </div>
      )}

      {/* JOBS */}

      <div
        onClick={() =>
          setShowJobs(!showJobs)
        }
        style={{
          padding: "14px 18px",
          borderRadius: 14,
          marginBottom: 10,
          cursor: "pointer",
          fontSize: 16,
          fontWeight: 600,
          background: "#1E293B",
        }}
      >
        💼 Jobs {showJobs ? "▾" : "▸"}
      </div>

      {showJobs && (
        <div>
          <Link
            to="/admin/job-dashboard"
            style={subMenuStyle(
              "/admin/job-dashboard"
            )}
          >
            Job Dashboard
          </Link>

          <Link
            to="/admin/jobs"
            style={subMenuStyle(
              "/admin/jobs"
            )}
          >
            Manage Jobs
          </Link>

          <Link
            to="/admin/jobs/create"
            style={subMenuStyle(
              "/admin/jobs/create"
            )}
          >
            Create Job
          </Link>

          <Link
            to="/admin/job-applications"
            style={subMenuStyle(
              "/admin/job-applications"
            )}
          >
            Job Applications
          </Link>
        </div>
      )}
    </div>
  );
}