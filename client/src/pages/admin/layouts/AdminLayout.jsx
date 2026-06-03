import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";

export default function AdminLayout({
  children,
}) {
  return (
    <div
      className="
        min-h-screen
        bg-slate-100
      "
    >
      {/* Sidebar */}

      <AdminSidebar />

      {/* Main Content */}

      <div
        className="
          ml-[250px]
          min-h-screen
          flex
          flex-col
        "
      >
        {/* Topbar */}

        <div
          className="
            sticky
            top-0
            z-30
            bg-white
            border-b
            border-slate-200
            shadow-sm
          "
        >
          <Topbar />
        </div>

        {/* Page Content */}

        <main
          className="
            flex-1
            p-6
            lg:p-8
          "
        >
          <div
            className="
              max-w-[1600px]
              mx-auto
            "
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}