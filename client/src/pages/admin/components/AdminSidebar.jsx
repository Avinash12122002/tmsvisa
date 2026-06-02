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

  // ===== JOB PORTAL =====

  {
    label: "💼 Job Dashboard",
    path: "/admin/job-dashboard",
  },

  {
    label: "📋 Manage Jobs",
    path: "/admin/jobs",
  },

  {
    label: "➕ Create Job",
    path: "/admin/jobs/create",
  },

  {
    label: "📄 Job Applications",
    path: "/admin/job-applications",
  },

  // ===== USERS =====

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

  const location =
    useLocation();

  return (

   <div
      style={{
        width: 220,
        background: "#0F172A",
        color: "white",
        padding: 24,
        height: "100vh",        // ← was minHeight, now fixed height
        boxSizing: "border-box",
        position: "fixed",      // ← keeps it pinned while page scrolls
        top: 0,
        left: 0,
        overflowY: "auto",      // ← lets menu items scroll if they ever overflow
      }}
    >

      {/* LOGO */}

      <h2
        style={{
          fontSize: 32,

          fontWeight: 700,

          marginBottom: 40,
        }}
      >
        Visa CRM
      </h2>

      {/* MENUS */}

      <div>

        {menus.map((menu) => (

          <Link
            key={menu.path}

            to={menu.path}

            style={{
              display: "block",

              padding: "14px 18px",

              borderRadius: 14,

              marginBottom: 14,

              textDecoration: "none",

              color: "white",

              fontSize: 18,

              fontWeight: 500,

              transition: "0.2s",

              background:
                location.pathname ===
                menu.path

                  ? "#2563EB"

                  : "transparent",
            }}
          >

            {menu.label}

          </Link>
        ))}

      </div>

    </div>
  );
}